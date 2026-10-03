'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAccount } from '@/components/account-provider';
import { BookmarkIcon, SearchIcon } from '@/components/icons';
import page from '@/components/page.module.css';
import card from '@/components/exam-card.module.css';
import { DailyQuests, Rail, StatPills, StreakCard } from '@/components/rail';
import { useLoad } from '@/lib/api';
import { DocKind, docKind, examHref, score } from '@/lib/format';
import { KnowledgeGraph, getDocuments, getHistoryList, getKnowledgeGraph } from '@/shared/api/client';
import s from './documents.module.css';

const BADGES: Record<DocKind, string> = { official: 'Đề chính thức', ref: 'Đề tham khảo', mock: 'Đề thi thử' };
const FILTERS: [DocKind | 'all', string][] = [
	['all', 'Tất cả'],
	['official', 'Chính thức'],
	['ref', 'Tham khảo'],
	['mock', 'Thi thử'],
];
const WEAK_LIMIT = 3;

const weakColors = (value: number) =>
	value < 50 ? ['#F2542D', '#C23B19'] : value < 70 ? ['#FFB21E', '#F5A300'] : ['#14B866', '#0B8C4B'];

function orgOf(source: string) {
	try {
		return new URL(source).hostname.replace(/^www\./, '');
	} catch {
		return source;
	}
}

export default function DocumentsPage() {
	const { account, save } = useAccount();
	const { data: documents, error } = useLoad(getDocuments, []);
	const { data: history } = useLoad(getHistoryList, []);
	const { data: graph } = useLoad<KnowledgeGraph | null>(getKnowledgeGraph, null);
	const [kind, setKind] = useState<DocKind | 'all'>('all');
	const [query, setQuery] = useState('');
	const [savedOnly, setSavedOnly] = useState(false);
	const [saved, setSaved] = useState<string[] | null>(null);
	const savedIds = saved ?? account.saved_exam_ids;

	const scores = new Map<string, number>();
	for (const attempt of history) if (!scores.has(attempt.exam_id)) scores.set(attempt.exam_id, attempt.total_score);

	const weak = (graph?.nodes ?? [])
		.filter((node) => node.score !== null)
		.sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
		.slice(0, WEAK_LIMIT);

	const pick = documents.find((doc) => !doc.is_completed);
	const needle = query.trim().toLowerCase();
	const list = documents.filter(
		(doc) =>
			(kind === 'all' || docKind(doc.title) === kind) &&
			(!savedOnly || savedIds.includes(doc.id)) &&
			(!needle || doc.title.toLowerCase().includes(needle)),
	);

	const toggleSave = (id: string) => {
		const next = savedIds.includes(id) ? savedIds.filter((entry) => entry !== id) : [...savedIds, id];
		setSaved(next);
		save({ saved_exam_ids: next }).catch(() => {});
	};

	return (
		<div className={page.withRail}>
			<main className={page.main}>
				<div className={page.inner}>
					<div className={page.head}>
						<h1 className={page.title}>Kho đề thi</h1>
						<div className={s.actions}>
							<button type="button" className={`${s.saved} ${savedOnly ? s.on : ''}`} onClick={() => setSavedOnly(!savedOnly)}>
								Đề đã lưu · {savedIds.length}
							</button>
							{pick && (
								<Link href={examHref(pick.id, 'exam')} className={s.quick}>
									LUYỆN ĐỀ NHANH
								</Link>
							)}
						</div>
					</div>

					{weak.length > 0 && (
						<div className={s.weak}>
							<div className={s.weakList}>
								{weak.map((node) => {
									const [fill, shade] = weakColors(node.score ?? 0);
									return (
										<div key={node.id} className={s.weakRow}>
											{node.label}
											<span className={s.weakTrack}>
												<span className={s.weakFill} style={{ width: `${node.score}%`, background: fill, boxShadow: `inset 0 -3px 0 ${shade}` }} />
											</span>
											<span className={s.weakNum}>{node.score}%</span>
										</div>
									);
								})}
							</div>
							<Link href="/practice" className={s.weakGo}>
								LUYỆN CHỖ YẾU
							</Link>
						</div>
					)}

					<div className={s.filters}>
						<label className={s.search}>
							<SearchIcon />
							<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm tên đề hoặc mã đề…" />
						</label>
						{FILTERS.map(([key, label]) => (
							<button key={key} type="button" className={`${page.chip} ${s.chip} ${kind === key ? page.on : ''}`} onClick={() => setKind(key)}>
								{label}
							</button>
						))}
					</div>

					<div className={s.listHead}>
						{savedOnly ? 'Đề em đã lưu' : 'Đề gần đây'}
						<span>{savedOnly ? `${list.length} đề` : `${documents.length} đề · mới nhất`}</span>
					</div>

					{error && <div className={page.error}>{error}</div>}

					<div className={s.list}>
						{list.map((doc) => {
							const done = doc.is_completed || scores.has(doc.id);
							const type = docKind(doc.title);
							const isSaved = savedIds.includes(doc.id);
							const last = scores.get(doc.id);

							return (
								<article key={doc.id} className={`${card.card} ${doc === pick && !savedOnly ? s.pick : ''}`}>
									<div>
										<div className={s.meta}>
											<span className={`${s.badge} ${s[type]}`}>{BADGES[type]}</span>
											{orgOf(doc.source)}
											{done && <span className={s.doneBadge}>ĐÃ LÀM{last !== undefined && ` · ${score(last)}`}</span>}
										</div>
										<h3 className={s.examTitle}>{doc.title}</h3>
										<div className={s.tags}>
											<span className={s.tag}>{doc.duration} phút</span>
											<span className={s.tag}>{doc.total_questions} câu</span>
											{doc.year && <span className={s.tag}>Năm {doc.year}</span>}
										</div>
									</div>
									<div className={s.examActions}>
										<button type="button" title="Lưu đề" className={`${s.bookmark} ${isSaved ? s.on : ''}`} onClick={() => toggleSave(doc.id)}>
											<BookmarkIcon filled={isSaved} />
										</button>
										<Link href={examHref(doc.id, 'exam')} className={`${card.action} ${done ? s.again : ''}`}>
											{done ? 'LÀM LẠI' : 'LÀM ĐỀ'}
										</Link>
									</div>
								</article>
							);
						})}

						{list.length === 0 && (
							<div className={page.empty}>
								{savedOnly ? 'Chưa lưu đề nào. Bấm biểu tượng dấu trang trên đề để lưu nha.' : 'Chưa có đề nào khớp. Thử bộ lọc khác nha.'}
							</div>
						)}
					</div>
				</div>
			</main>

			<Rail>
				<StatPills />
				<StreakCard />
				<DailyQuests />
			</Rail>
		</div>
	);
}
