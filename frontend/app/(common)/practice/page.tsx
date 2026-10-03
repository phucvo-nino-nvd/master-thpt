'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAccount } from '@/components/account-provider';
import page from '@/components/page.module.css';
import { DailyQuests, Rail, StatPills, StreakCard } from '@/components/rail';
import { useLoad, useMounted } from '@/lib/api';
import { WEEKDAY_NAMES, dayKey, examHref } from '@/lib/format';
import { Exam, getHistoryList, getReview } from '@/shared/api/client';
import s from './practice.module.css';

const GOALS = [5, 10, 20];
const MIX: Record<number, number[]> = { 5: [2, 2, 1], 10: [4, 4, 2], 20: [8, 8, 4] };
const MIX_LABELS = [
	['câu em từng sai', '#F2542D'],
	['ôn bài đã học', '#A8DC2C'],
	['thử thách khó hơn', '#FFB21E'],
];

export default function PracticePage() {
	const { account, save } = useAccount();
	const mounted = useMounted();
	const [picked, setPicked] = useState<number | null>(null);
	const goal = picked ?? account.settings.daily_goal;
	const { data: review, error } = useLoad<Exam | null>(getReview, null);
	const { data: history } = useLoad(getHistoryList, []);
	const total = review?.questions.length ?? 0;
	const now = new Date();
	const done = mounted
		? history.find((attempt) => attempt.mode === 'review' && attempt.total_questions > 0 && dayKey(new Date(attempt.created_at)) === dayKey(now))
		: undefined;
	const startHref = review && total ? `${examHref(review.exam_id, 'review')}&limit=${goal}` : '/learning_path';

	const chooseGoal = (value: number) => {
		setPicked(value);
		save({ settings: { daily_goal: value } }).catch(() => {});
	};

	return (
		<div className={page.withRail}>
			<main className={page.main}>
				<div className={`${page.inner} ${s.inner}`}>
					<div className={page.head}>
						<h1 className={page.title}>Nhiệm vụ</h1>
						<div className={s.goal}>
							Mục tiêu mỗi ngày
							<div className={s.segment}>
								{GOALS.map((value) => (
									<button key={value} type="button" className={goal === value ? s.on : ''} onClick={() => chooseGoal(value)}>
										{value} câu
									</button>
								))}
							</div>
						</div>
					</div>

					{error && <div className={page.error}>{error}</div>}

					{done ? (
						<article className={s.done}>
							<div className={s.doneBody}>
								<div className={s.doneKicker}>XONG BÀI HÔM NAY</div>
								<div className={s.doneTitle}>
									Đúng {done.correct_count}/{done.total_questions}
								</div>
								<div className={s.doneCopy}>Mai có bài mới. Em có thể tiếp tục ôn nếu muốn luyện thêm.</div>
							</div>
							<Link href={startHref} className={s.more}>
								Luyện thêm
							</Link>
						</article>
					) : (
						<article className={s.today}>
							<span className={s.blob} />
							<div className={`${s.layer} ${s.kicker}`}>
								BÀI LUYỆN HÔM NAY{mounted && ` · ${WEEKDAY_NAMES[now.getDay()]} ${now.getDate()}/${now.getMonth() + 1}`}
							</div>
							<h2 className={`${s.layer} ${s.todayTitle}`}>
								{total ? `${Math.min(goal, total)} câu trộn từ những gì em đã học` : 'Chưa có bài luyện hôm nay'}
							</h2>
							<p className={`${s.layer} ${s.todayCopy}`}>
								{total
									? 'Bài mới mỗi ngày, không theo chặng. Câu em từng sai được đưa lại đúng lúc sắp quên.'
									: 'Qua vài trạm ở Lộ trình trước nha. Làm xong là mai có bài trộn riêng cho em.'}
							</p>
							{total > 0 && (
								<div className={`${s.layer} ${s.mix}`}>
									{MIX[goal].map((count, i) => (
										<div key={MIX_LABELS[i][0]} className={s.mixTile}>
											<b>
												<i style={{ background: MIX_LABELS[i][1] }} />
												{count}
											</b>
											{MIX_LABELS[i][0]}
										</div>
									))}
								</div>
							)}
							<Link href={startHref} className={`${s.layer} ${s.start}`}>
								{total ? 'BẮT ĐẦU' : 'VÀO LỘ TRÌNH'}
							</Link>
						</article>
					)}

					<DailyQuests />
				</div>
			</main>

			<Rail>
				<StatPills />
				<StreakCard />
			</Rail>
		</div>
	);
}
