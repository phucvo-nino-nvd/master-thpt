'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAccount } from '@/components/account-provider';
import page from '@/components/page.module.css';
import card from '@/components/exam-card.module.css';
import { Rail } from '@/components/rail';
import { useLoad, useMounted } from '@/lib/api';
import { WEEKDAYS, dayKey, score, weekdayIndex } from '@/lib/format';
import { OBSTACLE_PREFIX, fullName, locate } from '@/lib/quest';
import { HistoryMode, Quest, getDocuments, getHistoryList, getQuest } from '@/shared/api/client';
import s from './history.module.css';

type Kind = 'quest' | 'exam' | 'self';

const KIND_OF: Record<HistoryMode, Kind> = {
	exam: 'exam',
	practice: 'self',
	review: 'self',
	checkpoint: 'quest',
	obstacle: 'quest',
	placement: 'quest',
	skip: 'quest',
};
const LABELS: Record<Kind, string> = {
	quest: 'Lộ trình',
	exam: 'Đề thi',
	self: 'Tự luyện',
};
const FILTERS: (Kind | 'all')[] = ['all', 'quest', 'exam', 'self'];
const RANGES: [number, string][] = [
	[30, '30 ngày gần nhất'],
	[7, '7 ngày gần nhất'],
	[0, 'Tất cả'],
];
const STREAK_MILESTONES = [7, 14, 30, 50, 100];
const DAY_MS = 86400000;
const HIGH_SCORE = 8;
const LOW_SCORE = 7;

const pad = (n: number) => String(n).padStart(2, '0');

function Month({ learned, today }: { learned: Set<string>; today: Date }) {
	const year = today.getFullYear();
	const month = today.getMonth();
	const length = new Date(year, month + 1, 0).getDate();
	const lead = weekdayIndex(new Date(year, month, 1));
	const isLearned = (day: number) => learned.has(dayKey(new Date(year, month, day)));
	const done = Array.from({ length: today.getDate() }, (_, i) => i + 1).filter(isLearned).length;

	return (
		<div className={s.month}>
			<div className={s.monthHead}>
				Tháng {month + 1} · {year}
				<span>
					{done}/{today.getDate()} ngày
				</span>
			</div>
			<div className={s.calendar}>
				{WEEKDAYS.map((label) => (
					<span key={label} className={s.weekday}>
						{label}
					</span>
				))}
				{Array.from({ length: lead }, (_, i) => (
					<span key={`lead-${i}`} />
				))}
				{Array.from({ length }, (_, i) => {
					const day = i + 1;
					const on = isLearned(day);
					const state = on ? s.learned : day === today.getDate() ? s.today : day > today.getDate() ? s.future : s.missed;
					const link = on && (lead + i) % 7 < 6 && day < length && isLearned(day + 1);

					return (
						<div key={day} className={`${s.cell} ${state} ${link ? s.link : ''}`}>
							{day}
						</div>
					);
				})}
			</div>
			<div className={s.legend}>
				<span>
					<i />
					Có học
				</span>
				<span>
					<i className={s.dashed} />
					Hôm nay
				</span>
			</div>
		</div>
	);
}

export default function HistoryPage() {
	const { account } = useAccount();
	const mounted = useMounted();
	const { data: history, error } = useLoad(getHistoryList, []);
	const { data: documents } = useLoad(getDocuments, []);
	const { data: quest } = useLoad<Quest | null>(getQuest, null);
	const [kind, setKind] = useState<Kind | 'all'>('all');
	const [range, setRange] = useState(0);
	const [days, rangeLabel] = RANGES[range];

	const titles = new Map(documents.map((doc) => [doc.id, doc.title]));

	const titleOf = (examId: string) => {
		if (titles.has(examId)) return titles.get(examId);
		if (examId.startsWith('review:')) return 'Nhiệm vụ hôm nay';
		const spot = quest && locate(quest, examId.replace(OBSTACLE_PREFIX, ''));
		if (!spot) return examId;
		return examId.startsWith(OBSTACLE_PREFIX) ? `Bom ôn tập: ${spot.item.name}` : fullName(spot);
	};

	const recent = history.filter((attempt) => attempt.total_questions > 0 && (!days || Date.now() - new Date(attempt.created_at).getTime() <= days * DAY_MS));
	const list = recent.filter((attempt) => kind === 'all' || KIND_OF[attempt.mode] === kind);
	const scores = list.map((attempt) => attempt.total_score);
	const attempts = (examId: string) => history.filter((attempt) => attempt.exam_id === examId).length;
	const learned = new Set([...history.map((attempt) => dayKey(new Date(attempt.created_at))), ...account.activity.map((day) => day.date)]);
	const milestone = STREAK_MILESTONES.find((value) => value > account.streak) ?? account.streak;

	return (
		<div className={page.withRail}>
			<main className={page.main}>
				<div className={page.inner}>
					<div className={page.head}>
						<div>
							<div className={page.eyebrow}>DỮ LIỆU HỌC TẬP</div>
							<h1 className={page.title}>Lịch sử làm bài</h1>
						</div>
						<button type="button" className={s.range} onClick={() => setRange((range + 1) % RANGES.length)}>
							{rangeLabel} ▾
						</button>
					</div>

					<div className={s.stats}>
						<div className={`${s.stat} ${s.avg}`}>
							<b>
								{scores.length ? score(scores.reduce((a, b) => a + b, 0) / scores.length) : '–'}
								<small>/10</small>
							</b>
							điểm trung bình
						</div>
						<div className={s.stat}>
							<b>{list.length}</b>
							bài đã làm
						</div>
						<div className={`${s.stat} ${s.best}`}>
							<b>{scores.length ? score(Math.max(...scores)) : '–'}</b>
							điểm cao nhất
						</div>
					</div>

					<div className={page.chips}>
						{FILTERS.map((key) => (
							<button key={key} type="button" className={`${page.chip} ${kind === key ? `${page.on} ${s.on}` : ''}`} onClick={() => setKind(key)}>
								{key === 'all' ? 'Tất cả' : LABELS[key]}
								<span className={s.count}>{key === 'all' ? recent.length : recent.filter((attempt) => KIND_OF[attempt.mode] === key).length}</span>
							</button>
						))}
					</div>

					{error && <div className={page.error}>{error}</div>}

					<div className={s.list}>
						{list.map((attempt) => {
							const type = KIND_OF[attempt.mode];
							const date = new Date(attempt.created_at);
							const tone = attempt.total_score >= HIGH_SCORE ? s.hi : attempt.total_score < LOW_SCORE ? s.lo : '';

							return (
								<article key={attempt.history_id} className={`${card.card} ${s[type]}`}>
									<div className={s.itemBody}>
										<div className={s.meta}>
											<span className={s.badge}>{LABELS[type]}</span>
											{pad(date.getDate())}/{pad(date.getMonth() + 1)} · {pad(date.getHours())}:{pad(date.getMinutes())}
										</div>
										<h3 className={s.itemTitle}>{titleOf(attempt.exam_id)}</h3>
										<div className={s.itemMeta}>
											<span className={`${s.score} ${tone}`}>
												Điểm <b>{score(attempt.total_score)}</b><span className={s.scoreScale}>/10</span>
											</span>
											<span className={s.detail}>{attempt.correct_count}/{attempt.total_questions} câu đúng</span>
											{attempt.duration_seconds ? <span className={s.detail}>{Math.max(1, Math.round(attempt.duration_seconds / 60))} phút</span> : null}
											<span className={s.detail}>{attempts(attempt.exam_id)} lần làm</span>
										</div>
									</div>
									<Link href={`/history/${attempt.history_id}`} className={`${card.action} ${s.review}`} aria-label={`Xem lại ${titleOf(attempt.exam_id)}`}>
										XEM LẠI
									</Link>
								</article>
							);
						})}

						{list.length === 0 && <div className={page.empty}>Chưa có bài nào ở đây. Làm xong bài đầu tiên là lịch sử hiện ngay.</div>}
					</div>
				</div>
			</main>

			<Rail>
				{mounted && <Month learned={learned} today={new Date()} />}
				<div className={s.milestone}>
					<span className={s.milestoneBadge}>{milestone}</span>
					<div className={s.milestoneBody}>
						Còn {milestone - account.streak} ngày tới mốc {milestone}
						<div className={s.milestoneBar}>
							<span style={{ width: `${(100 * account.streak) / milestone}%` }} />
						</div>
					</div>
				</div>
			</Rail>
		</div>
	);
}
