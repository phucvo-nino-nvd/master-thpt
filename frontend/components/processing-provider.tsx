'use client';

import { useAuth } from '@clerk/nextjs';
import { isAxiosError } from 'axios';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { pendingSources } from '@/lib/processing';
import {
	MOCK_ACCOUNT, approveIngestSource, getProcessingSnapshot, rejectIngestSource, setIngestMode, submitExam,
	type ProcessingSnapshot, type SubmitExamBody, type SubmitExamResponse,
} from '@/shared/api/client';
import { getApiErrorMessage } from '@/shared/api/error-message';

type ProcessingContextValue = {
	snapshot: ProcessingSnapshot | null;
	submitting: boolean;
	result: SubmitExamResponse | null;
	error: string;
	busy: boolean;
	remaining: number;
	enabled: boolean;
	refresh: () => void;
	submit: (body: SubmitExamBody) => Promise<SubmitExamResponse>;
	changeMode: (manual: boolean) => Promise<void>;
	process: (urls: string[], approve: boolean) => Promise<void>;
};

const ProcessingContext = createContext<ProcessingContextValue | null>(null);
const pause = (signal: AbortSignal) => new Promise<void>((resolve, reject) => {
	if (signal.aborted) { reject(signal.reason); return; }
	const abort = () => { clearTimeout(timer); reject(signal.reason); };
	const timer = setTimeout(() => { signal.removeEventListener('abort', abort); resolve(); }, 2000);
	signal.addEventListener('abort', abort, { once: true });
});

export function ProcessingProvider({ children }: { children: ReactNode }) {
	const { isLoaded, isSignedIn, userId } = useAuth();
	const enabled = !!isLoaded && (!!isSignedIn || MOCK_ACCOUNT);
	const [snapshot, setSnapshot] = useState<ProcessingSnapshot | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const [result, setResult] = useState<SubmitExamResponse | null>(null);
	const [error, setError] = useState('');
	const [connectionError, setConnectionError] = useState('');
	const [busy, setBusy] = useState(false);
	const [remaining, setRemaining] = useState(0);
	const [version, setVersion] = useState(0);
	const operation = useRef<AbortController | null>(null);
	const generation = useRef(0);
	const latestRequest = useRef(0);

	async function read(signal: AbortSignal) {
		const request = ++latestRequest.current;
		const next = await getProcessingSnapshot(signal);
		if (!signal.aborted && request === latestRequest.current) {
			setSnapshot(next);
			setConnectionError('');
		}
		return next;
	}

	useEffect(() => {
		generation.current++;
		setSnapshot(null); setResult(null); setError(''); setConnectionError(''); setSubmitting(false); setBusy(false); setRemaining(0);
		return () => { generation.current++; operation.current?.abort(); operation.current = null; };
	}, [userId, enabled]);

	useEffect(() => {
		if (!enabled) return;
		const controller = new AbortController();
		let timer: ReturnType<typeof setTimeout>;
		const poll = async () => {
			let delay = 10000;
			try {
				const next = await read(controller.signal);
				if (next.practice.stage || next.grading.exam_id || operation.current) delay = 2000;
			} catch (failure) {
				if (!controller.signal.aborted) setConnectionError(getApiErrorMessage(failure, 'Không tải được tiến trình.'));
			} finally {
				if (!controller.signal.aborted) timer = setTimeout(poll, delay);
			}
		};
		void poll();
		return () => { controller.abort(); clearTimeout(timer); };
	}, [enabled, userId, version]);

	const refresh = () => { setError(''); setVersion((value) => value + 1); };

	async function mutate(task: (signal: AbortSignal) => Promise<void>) {
		if (!enabled || operation.current) return;
		const controller = new AbortController();
		operation.current = controller;
		setBusy(true); setError('');
		try {
			await task(controller.signal);
		} catch (failure) {
			if (!controller.signal.aborted) setError(getApiErrorMessage(failure, 'Chưa xử lý được nguồn. Tải lại trạng thái để kiểm tra.'));
		} finally {
			if (!controller.signal.aborted) {
				operation.current = null;
				setBusy(false); setRemaining(0); setVersion((value) => value + 1);
			}
		}
	}

	async function process(urls: string[], approve: boolean) {
		await mutate(async (signal) => {
			const unique = [...new Set(urls)];
			for (const [index, url] of unique.entries()) {
				setRemaining(unique.length - index);
				if (!approve) { await rejectIngestSource(url, signal); await read(signal); continue; }
				const deadline = Date.now() + 20 * 60 * 1000;
				let accepted = false;
				while (!signal.aborted) {
					const state = await read(signal);
					const queued = pendingSources(state.ingest).some((source) => source.url === url);
					if (!queued && !state.practice.stage) break;
					if (Date.now() > deadline) throw new Error('Nguồn xử lý lâu hơn dự kiến. Tải lại trạng thái trước khi duyệt tiếp.');
					if (queued && !state.practice.stage && !accepted) {
						try { await approveIngestSource(url, signal); accepted = true; }
						catch (failure) { if (!isAxiosError(failure) || failure.response?.status !== 409) throw failure; }
					}
					await pause(signal);
				}
			}
		});
	}

	async function submit(body: SubmitExamBody) {
		const owner = generation.current;
		setSubmitting(true); setResult(null); setError('');
		try {
			const response = await submitExam(body);
			if (owner === generation.current) setResult(response);
			return response;
		} catch (failure) {
			if (owner === generation.current) setError(getApiErrorMessage(failure, 'Chưa nhận được kết quả chấm. Kiểm tra lại bài làm.'));
			throw failure;
		} finally {
			if (owner === generation.current) { setSubmitting(false); setVersion((value) => value + 1); }
		}
	}

	return <ProcessingContext.Provider value={{ snapshot, submitting, result, error: error || connectionError, busy, remaining, enabled, refresh, submit, process,
		changeMode: (manual) => mutate(async (signal) => { await setIngestMode(manual, signal); await read(signal); }),
	}}>{children}</ProcessingContext.Provider>;
}

export function useProcessing() {
	const context = useContext(ProcessingContext);
	if (!context) throw new Error('ProcessingProvider is missing.');
	return context;
}
