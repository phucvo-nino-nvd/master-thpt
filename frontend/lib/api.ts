'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect, useRef, useState } from 'react';
import { setClerkToken } from '@/shared/api/client';
import { getApiErrorMessage } from '@/shared/api/error-message';

export function useSyncClerkToken() {
	const { getToken } = useAuth();

	useEffect(() => {
		setClerkToken(getToken);

		return () => {
			setClerkToken(null);
		};
	}, [getToken]);
}

export function useMounted() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	return mounted;
}

export function useLoad<T>(load: () => Promise<T>, initial: T, deps: unknown[] = []) {
	const { isLoaded, userId } = useAuth();
	const [state, setState] = useState({ data: initial, loading: true, error: '' });
	const owner = useRef(userId);

	useEffect(() => {
		if (!isLoaded) return;

		let live = true;

		if (owner.current !== userId) {
			owner.current = userId;
			setState({ data: initial, loading: true, error: '' });
		}

		load().then(
			(data) => live && setState({ data, loading: false, error: '' }),
			(error) => live && setState((prev) => ({ ...prev, loading: false, error: getApiErrorMessage(error, 'Không tải được dữ liệu.') })),
		);

		return () => {
			live = false;
		};
	}, [isLoaded, userId, ...deps]);

	return { ...state, setData: (data: T) => setState((prev) => ({ ...prev, data })) };
}
