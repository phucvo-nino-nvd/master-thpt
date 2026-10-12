'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useLoad } from '@/lib/api';
import { examHref, score, weakest } from '@/lib/format';
import { pendingSources, processingPhase, sourceHref } from '@/lib/processing';
import { DocumentItem, KnowledgeGraph, MOCK_ACCOUNT, getKnowledgeGraph, getPracticeSets } from '@/shared/api/client';
import { useAccount } from './account-provider';
import { AgentIcon, ChevronUpIcon, StopwatchIcon } from './icons';
import { PlanSheet } from './plans';
import { useProcessing } from './processing-provider';
import s from './processing-widget.module.css';
import r from './rail.module.css';
import t from '@/features/exams/tutor.module.css';

const PHASES = {
	grading: [0, 'Đang chấm bài'], finding: [1, 'Đang tìm nguồn'], approval: [2, 'Chờ duyệt nguồn'],
	parsing: [2, 'Đang chuẩn hóa'], authoring: [2, 'Đang tạo bài'], indexing: [3, 'Đang cập nhật kho'], idle: [-1, 'Không có tác vụ'],
} as const;

function ProgressBar({ reached, error }: { reached: number; error: boolean }) {
	return (
		<span className={r.bar}>
			<span className={r.track}><span className={r.fill} style={{ width: `${100 * reached / 4}%`, background: error ? 'var(--coral)' : '#29B0F2' }} /></span>
			<span className={r.num}>{reached} / 4</span>
		</span>
	);
}

export function ProcessingCard() {
	const { snapshot, submitting, result, error, busy, remaining, enabled, refresh, changeMode, process } = useProcessing();
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState<string[]>([]);
	const all = useRef<HTMLInputElement>(null);
	const sources = snapshot ? pendingSources(snapshot.ingest) : [];
	const urls = sources.filter((source) => selected.includes(source.url)).map((source) => source.url);
	const phase = processingPhase(snapshot, submitting);
	const [step, label] = PHASES[phase];
	const reached = step < 0 ? result ? 4 : 0 : step + 1;
	const active = !['idle', 'approval'].includes(phase);
	const title = error ? 'Cần kiểm tra trạng thái' : busy && !active ? 'Đang gửi yêu cầu' : phase === 'idle' && result ? 'Đã chấm bài' : label;
	const note = remaining ? `Còn ${remaining} nguồn đã chọn` : sources.length ? `${sources.length} nguồn chờ duyệt` : snapshot?.practice.total ? `Lượt ${snapshot.practice.step}/${snapshot.practice.total}` : result ? 'Kết quả đã lưu' : snapshot ? snapshot.ingest.manual ? 'Thủ công' : 'Tự động' : 'Đang tải trạng thái';

	useEffect(() => { if (all.current) all.current.indeterminate = urls.length > 0 && urls.length < sources.length; }, [urls.length, sources.length, open]);
	useEffect(() => { setSelected([]); setOpen(false); }, [enabled]);

	if (!enabled) return null;

	const act = (approve: boolean) => { void process(urls, approve); setSelected([]); };

	return (
		<section className={s.card} aria-label="Tiến trình">
			<button className={`${r.task} ${s.summary}`} aria-expanded={open} onClick={() => setOpen(!open)}>
				<span className={r.taskIcon} style={{ background: '#e3f5ff' }}><StopwatchIcon size={30} /></span>
				<span className={r.taskBody}>
					<span className={`${r.taskTitle} ${s.summaryTitle}`}>{title} · {note}<ChevronUpIcon size={16} className={`${s.caret} ${open ? '' : s.open}`} /></span>
					<ProgressBar reached={reached} error={!!error} />
				</span>
			</button>
			<span className={s.srOnly} role="status" aria-live="polite">{title}{step >= 0 ? ` · Bước ${step + 1} trên 4` : ''}</span>
			{open && <div className={s.body}>
				{MOCK_ACCOUNT && <p className={s.context}>Dữ liệu mẫu</p>}
				{snapshot?.practice.concept && <p className={s.context}>{snapshot.practice.concept}</p>}
				{error && <div role="alert" className={s.error}>{error}<button onClick={refresh} disabled={busy}>Tải lại ↻</button></div>}
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
				{result && <div className={s.result}><span><strong>{score(result.total_score)}</strong><small>/10 · Đã chấm</small></span><Link href={`/history/${encodeURIComponent(result.history_id)}`}>Xem bài →</Link></div>}
			</div>}
		</section>
	);
}

export function AuthorDock() {
	const { snapshot, submitting, error, busy, enabled, request } = useProcessing();
	const pathname = usePathname();
	const [composing, setComposing] = useState(false);
	const [query, setQuery] = useState('');
	const [sent, setSent] = useState('');
	const [sets, setSets] = useState<DocumentItem[]>([]);
	const [authoring, setAuthoring] = useState(false);
	const [started, setStarted] = useState(false);
	const [failed, setFailed] = useState('');
	const [pending, setPending] = useState('');
	const { account } = useAccount();
	const pro = account.plan === 'pro';
	const [, label] = PHASES[processingPhase(snapshot, submitting)];
	const root = useRef<HTMLDivElement>(null);
	const toggle = useRef<HTMLButtonElement>(null);
	const { data: graph } = useLoad<KnowledgeGraph | null>(() => (composing ? getKnowledgeGraph() : Promise.resolve(null)), null, [composing]);
	const stage = snapshot?.practice.stage;
	const concept = stage ? snapshot.practice.concept : '';
	const weak = weakest(graph?.nodes ?? []);

	const deliver = async (topic: string) => {
		const update = await request(topic);
		if (!update) { setFailed(topic); return; }
		setSent(topic); setSets(update.sets); setAuthoring(update.authoring); setStarted(false); setFailed(''); setQuery('');
	};

	useEffect(() => { setComposing(false); }, [enabled, pathname]);
	useEffect(() => {
		if (!pending || !pro) return;
		setPending('');
		void deliver(pending);
	}, [pending, pro]);
	useEffect(() => { if (authoring && stage) setStarted(true); }, [authoring, stage]);
	useEffect(() => {
		if (!authoring || !started || stage) return;
		setAuthoring(false);
		getPracticeSets(sent).then(setSets, () => setSets([]));
	}, [authoring, started, stage, sent]);
	useEffect(() => {
		if (!composing) return;
		const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setComposing(false); };
		const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setComposing(false); toggle.current?.focus(); } };
		document.addEventListener('pointerdown', outside);
		document.addEventListener('keydown', escape);
		return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
	}, [composing]);

	if (!enabled || pathname.startsWith('/exams')) return null;

	const send = async (text: string) => {
		const topic = text.trim();
		if (!topic) return;
		if (pro) await deliver(topic);
		else setPending(topic);
	};
	const locked = busy || !!stage;

	return (
		<div ref={root} className={s.widget}>
			{pending && !pro && <PlanSheet title="Tạo đề thi dành cho gói Pro" onClose={() => setPending('')} run={(task) => task().catch(() => {})} />}
			{composing && <section id="author-panel" className={s.panel} aria-labelledby="author-title">
				<div className={s.head}>
					<h2 id="author-title">Tạo đề thi</h2>
					<button className={s.collapse} onClick={() => { setComposing(false); toggle.current?.focus(); }}>Thu gọn <ChevronUpIcon size={16} /></button>
				</div>
				<p className={s.context}>Gom câu có sẵn trong kho, chưa đủ thì trợ lý tự soạn thêm cho em.</p>
				<form className={s.search} onSubmit={(event) => { event.preventDefault(); void send(query); }}>
					<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tích phân, Đạo hàm, …" aria-label="Chủ đề cần thêm câu" autoFocus />
					<button type="submit" disabled={locked || !query.trim()}>Tạo</button>
				</form>
				{weak.length > 0 && <div className={s.suggest} role="group" aria-label="Gợi ý từ phần em còn yếu">
					{weak.map((node) => <button key={node.id} type="button" disabled={locked} onClick={() => void send(node.label)}>{node.label}<small>{node.score}%</small></button>)}
				</div>}
				{failed && error && <div role="alert" className={s.error}>{error}</div>}
				{(authoring || (!sent && concept)) && <div className={`${t.typing} ${s.typing}`}>
					<span className={t.dots} aria-hidden="true"><i /><i /><i /></span>
					&quot;{authoring ? sent : concept}&quot; · {!authoring ? label : stage === 'item_bank' ? 'Đang lưu vào kho' : 'Agent đang soạn câu'}
				</div>}
				{sent && !authoring && !failed && (sets.length ? <div className={s.sets}>
					{sets.map((set) => <Link key={set.id} href={examHref(set.id, 'practice')}><span>{set.title}</span><small>{set.total_questions} câu →</small></Link>)}
				</div> : <p className={s.context}>Đã soạn xong &quot;{sent}&quot;, câu mới đã vào kho.</p>)}
				<div className={s.fallback}><ProcessingCard /></div>
			</section>}
			<button ref={toggle} className={s.dock} aria-expanded={composing} aria-controls="author-panel" onClick={() => setComposing(!composing)}>
				<span className={s.spark} aria-hidden="true"><AgentIcon size={28} /></span>
				<span className={s.dockBody}><strong>Tạo đề thi</strong><small>{authoring ? `Đang soạn: ${sent}` : concept ? `Đang nạp: ${concept}` : 'Gom hoặc soạn câu theo ý em'}</small></span><ChevronUpIcon size={28} className={`${s.chevron} ${composing ? s.open : ''}`} />
			</button>
		</div>
	);
}
