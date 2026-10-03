'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { score } from '@/lib/format';
import { pendingSources, processingPhase, sourceHref } from '@/lib/processing';
import { MOCK_ACCOUNT } from '@/shared/api/client';
import { ChevronUpIcon } from './icons';
import { useProcessing } from './processing-provider';
import s from './processing-widget.module.css';

const PHASES = {
	grading: [0, 'Đang chấm bài'], finding: [1, 'Đang tìm nguồn'], approval: [2, 'Chờ duyệt nguồn'],
	parsing: [2, 'Đang chuẩn hóa'], authoring: [2, 'Đang tạo bài'], indexing: [3, 'Đang cập nhật kho'], idle: [-1, 'Không có tác vụ'],
} as const;

export function ProcessingWidget() {
	const { snapshot, submitting, result, error, busy, remaining, enabled, refresh, changeMode, process } = useProcessing();
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState<string[]>([]);
	const root = useRef<HTMLDivElement>(null);
	const toggle = useRef<HTMLButtonElement>(null);
	const all = useRef<HTMLInputElement>(null);
	const sources = snapshot ? pendingSources(snapshot.ingest) : [];
	const urls = sources.filter((source) => selected.includes(source.url)).map((source) => source.url);
	const phase = processingPhase(snapshot, submitting);
	const [step, label] = PHASES[phase];
	const active = !['idle', 'approval'].includes(phase);
	const title = error ? 'Cần kiểm tra trạng thái' : busy && !active ? 'Đang gửi yêu cầu' : phase === 'idle' && result ? 'Đã chấm bài' : label;
	const note = remaining ? `Còn ${remaining} nguồn đã chọn` : sources.length ? `${sources.length} nguồn chờ duyệt` : snapshot?.practice.total ? `Lượt ${snapshot.practice.step}/${snapshot.practice.total}` : result ? 'Kết quả đã lưu' : snapshot ? snapshot.ingest.manual ? 'Thủ công' : 'Tự động' : 'Đang tải trạng thái';

	useEffect(() => { if (all.current) all.current.indeterminate = urls.length > 0 && urls.length < sources.length; }, [urls.length, sources.length, open]);
	useEffect(() => { setSelected([]); setOpen(false); }, [enabled]);
	useEffect(() => {
		if (!open) return;
		const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
		const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
		document.addEventListener('pointerdown', outside);
		document.addEventListener('keydown', escape);
		return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
	}, [open]);

	if (!enabled) return null;

	const act = (approve: boolean) => { void process(urls, approve); setSelected([]); };
	const names = ['Chấm bài', 'Tìm nguồn', phase === 'authoring' ? 'Tạo câu hỏi' : 'Chuẩn hóa đề', 'Cập nhật kho'];

	return (
		<div ref={root} className={`${s.widget} ${pathname.startsWith('/exams') ? s.inExam : ''}`}>
			{open && <section id="processing-panel" className={s.panel} aria-labelledby="processing-title">
				<div className={s.head}>
					<h2 id="processing-title">Tiến trình</h2>
					<button className={s.collapse} onClick={() => { setOpen(false); toggle.current?.focus(); }}>Thu gọn <ChevronUpIcon size={16} /></button>
				</div>
				{MOCK_ACCOUNT && <p className={s.context}>Dữ liệu mẫu</p>}
				{snapshot?.practice.concept && <p className={s.context}>{snapshot.practice.concept}</p>}
				{error && <div role="alert" className={s.error}>{error}<button onClick={refresh} disabled={busy}>Tải lại ↻</button></div>}
				{phase !== 'idle' ? <ol className={s.timeline}>
					{names.map((name, index) => {
						const done = index === 0 ? !!result && !submitting : index < step;
						const current = index === step;
						const waiting = current && phase === 'approval';
						return <li key={index} className={`${s.step} ${done ? s.done : current ? waiting ? s.waiting : s.active : s.pending}`}>
							<span className={s.dot} aria-hidden="true">{done ? '✓' : waiting ? 'Ⅱ' : current ? <span className={s.spinner} /> : index + 1}</span>
							<span className={s.stepName}>{name}</span><small>{done ? 'Xong' : waiting ? 'Chờ duyệt' : current ? 'Đang chạy' : ''}</small>
						</li>;
					})}
				</ol> : <p className={s.empty}>{snapshot ? 'Chưa có tác vụ đang chạy.' : 'Đang tải tiến trình…'}</p>}
				<div className={s.segment} role="group" aria-label="Chế độ nạp đề">
					<button aria-pressed={snapshot?.ingest.manual === true} disabled={busy || !snapshot} onClick={() => void changeMode(true)}>Thủ công</button>
					<button aria-pressed={snapshot?.ingest.manual === false} disabled={busy || !snapshot} onClick={() => void changeMode(false)}>Tự động</button>
				</div>
				{sources.length > 0 && <div className={s.sources}>
					<div className={s.sourceHead}><strong>{sources.length} nguồn</strong><label className={s.selectAll}>
						<input ref={all} type="checkbox" className={s.checkbox} checked={urls.length === sources.length} disabled={busy} onChange={(event) => setSelected(event.target.checked ? sources.map((source) => source.url) : [])} />Tất cả
					</label></div>
					<div className={s.sourceList} role="group" aria-label="Nguồn chờ duyệt">
						{sources.map((source) => {
							const href = sourceHref(source.url);
							return <div key={source.url} className={s.sourceRow}>
								<label><input type="checkbox" className={s.checkbox} checked={urls.includes(source.url)} disabled={busy} onChange={(event) => setSelected((previous) => event.target.checked ? [...previous, source.url] : previous.filter((url) => url !== source.url))} />
									<span className={s.sourceCopy}><span className={s.sourceTitle}>{source.title || source.url}</span><span className={s.sourceUrl} title={source.url}>{source.url.replace(/^https?:\/\//, '')}</span></span>
								</label>
								{href && <a className={s.sourceLink} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Xem nguồn: ${source.title || source.url}`}>↗</a>}
							</div>;
						})}
					</div>
					<div className={s.actions}><button className={s.approve} disabled={!urls.length || busy || !!snapshot?.practice.stage} onClick={() => act(true)}>Duyệt ({urls.length})</button><button className={s.reject} disabled={!urls.length || busy} onClick={() => act(false)}>Bỏ qua</button></div>
				</div>}
				{result && <div className={s.result}><span><strong>{score(result.total_score)}</strong><small>/10 · Đã chấm</small></span><Link href={`/history/${encodeURIComponent(result.history_id)}`} onClick={() => setOpen(false)}>Xem bài →</Link></div>}
			</section>}
			<button ref={toggle} className={s.dock} aria-expanded={open} aria-controls="processing-panel" onClick={() => setOpen(!open)}>
				<span className={`${s.ring} ${phase === 'approval' ? s.waiting : ''} ${error ? s.failed : ''}`} aria-hidden="true">
					<svg viewBox="0 0 38 38"><circle className={s.track} cx="19" cy="19" r="16" /><circle className={s.fill} cx="19" cy="19" r="16" strokeDasharray="100.531" strokeDashoffset={100.531 * (1 - (step < 0 ? result ? 1 : 0 : (step + 1) / 4))} /></svg>
					<span>{error ? '!' : step < 0 ? result ? '✓' : '·' : `${step + 1}/4`}</span>
				</span>
				<span className={s.dockBody}><strong>{title}</strong><small>{note}</small></span><ChevronUpIcon size={32} className={`${s.chevron} ${open ? s.open : ''}`} />
			</button>
			<span className={s.srOnly} role="status" aria-live="polite">{title}{step >= 0 ? ` · Bước ${step + 1} trên 4` : ''}</span>
		</div>
	);
}
