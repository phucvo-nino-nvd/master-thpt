'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAccount } from '@/components/account-provider';
import page from '@/components/page.module.css';
import { ArenaCard, DailyQuests, Rail, StatPills, StreakCard } from '@/components/rail';
import { Rive } from '@/components/rive';
import { MathInline } from '@/features/exams/components/math-text';
import { useLoad, useMounted } from '@/lib/api';
import { examHref } from '@/lib/format';
import { questStep } from '@/lib/quest';
import { Exam, Quest, getQuest, getReview } from '@/shared/api/client';
import s from './today.module.css';

const MAX_SEGMENTS = 12;
const DEFAULT_SECONDS_PER_QUESTION = 90;

function greetingOf(hour: number, name: string) {
	if (hour < 12) return `Chào buổi sáng, ${name}!`;
	if (hour < 18) return `Chiều rồi nè ${name}!`;
	return `Tối rồi, xử nhanh 1 câu nha ${name}!`;
}

export default function TodayPage() {
	const { account, name } = useAccount();
	const mounted = useMounted();
	const [waves, setWaves] = useState(0);
	const { data: review } = useLoad<Exam | null>(getReview, null);
	const { data: quest } = useLoad<Quest | null>(getQuest, null);
	const step = questStep(quest);
	const total = review?.questions.length ?? 0;
	const daily = account.daily[0];
	const card = step?.bomb
		? {
				kicker: 'GỠ BOM TRƯỚC',
				title: `Hôm nay: gỡ bom ${step.name}`,
				count: step.total,
				reason: 'Vì trạm vừa rồi chưa đủ điểm. Gỡ bom là mở trạm tiếp theo.',
				href: examHref(step.id, step.mode),
				cta: 'GỠ BOM',
			}
		: review && total
			? {
					kicker: 'VIỆC CHÍNH HÔM NAY',
					title: `Hôm nay: củng cố ${review.focus?.knowledge ?? 'bài đã học'}`,
					count: total,
					reason: review.focus?.reason ?? 'Câu em từng sai được đưa lại đúng lúc sắp quên.',
					href: examHref(review.exam_id, 'review'),
					cta: 'BẮT ĐẦU LUYỆN',
				}
			: step
				? {
						kicker: 'KHUYÊN LÀM TRƯỚC',
						title: step.title,
						count: step.total,
						reason: step.mode === 'placement' ? 'Làm vài câu để mình biết em đang ở đâu.' : 'Qua trạm này là mở khoá trạm tiếp theo.',
						href: examHref(step.id, step.mode),
						cta: step.mode === 'placement' ? 'LÀM BÀI XÁC ĐỊNH' : 'VÀO TRẠM',
					}
				: {
						kicker: 'BẮT ĐẦU TỪ ĐÂY',
						title: 'Xếp lộ trình cho em',
						count: 0,
						reason: 'Chọn khối rồi làm bài xác định trình độ, mình xếp trạm hợp sức cho em.',
						href: '/learning_path',
						cta: 'VÀO LỘ TRÌNH',
					};
	const minutes = Math.max(1, Math.round((card.count * (review?.focus?.seconds_per_question ?? DEFAULT_SECONDS_PER_QUESTION)) / 60));
	const counted = card.count > 0 && !!daily && daily.current < daily.target;
	const now = new Date();
	const sub = account.kept_today
		? 'Lửa hôm nay giữ rồi. Làm thêm là cộng XP thôi.'
		: account.streak
			? `Còn 1 câu nữa là giữ lửa ${account.streak + 1} ngày.`
			: 'Làm 1 câu là nhóm lửa ngày đầu tiên nha.';

	return (
		<div className={page.withRail}>
			<main className={`${page.main} ${s.main}`}>
				<div className={`${page.inner} ${s.inner}`}>
					<div className={s.hello}>
						<div className={s.mascot} onClick={() => setWaves((n) => n + 1)}>
							<Rive src="mascot_hello" knockout fit="cover" fireonload trigger={`clic salut|${waves}`} bool="detect mouse=true" />
						</div>
						<div className={s.bubble}>
							{mounted && <div className={s.greeting}>{greetingOf(now.getHours(), name)}</div>}
							<div className={s.sub}>{sub}</div>
						</div>
					</div>

					<article className={`${s.focus} ${step?.bomb ? s.bombFocus : ''}`}>
						<span className={s.blobA} />
						<span className={s.blobB} />
						<div className={`${s.layer} ${s.tags}`}>
							{!step?.bomb && total > 0 && <span className={s.deadline}>HẠN HÔM NAY 23:59</span>}
							<span className={s.kicker}>{card.kicker}</span>
						</div>
						<div className={`${s.layer} ${s.focusBody}`}>
							<div>
								<h1 className={s.focusTitle}>
									<MathInline text={card.title} />
								</h1>
								{card.count > 0 && (
									<div className={s.eta}>
										{card.count} câu · khoảng {minutes} phút
									</div>
								)}
								<p className={s.focusCopy}>
									<MathInline text={card.reason} />
								</p>
							</div>
						</div>
						{card.count > 0 && (
							<div className={`${s.layer} ${s.segs}`} style={{ gridTemplateColumns: `repeat(${Math.min(card.count, MAX_SEGMENTS)}, 1fr)` }}>
								{Array.from({ length: Math.min(card.count, MAX_SEGMENTS) }, (_, i) => (
									<span key={i} className={`${s.seg} ${i ? '' : s.activeSeg}`} />
								))}
							</div>
						)}
						<div className={`${s.layer} ${s.actions}`}>
							<Link href={card.href} className={s.go}>
								{card.cta}
							</Link>
							{!step?.bomb && total > 0 && (
								<Link href="/practice" className={s.ghost}>
									Xem cả phiếu
								</Link>
							)}
						</div>
						{counted && (
							<p className={`${s.layer} ${s.note}`}>
								Câu đúng ở đây cũng tính vào nhiệm vụ Đúng {daily.target} câu ({daily.current}/{daily.target}).
							</p>
						)}
					</article>

					{account.gains.length > 0 && (
						<div className={s.gains}>
							<div className={s.gainsHead}>
								Tuần này em tiến được {account.gains.length} khái niệm
								<span>so với tuần trước</span>
							</div>
							<div className={s.gainList}>
								{account.gains.map((gain) => (
									<div key={gain.name} className={s.gain}>
										{gain.name}
										<span className={s.gainTrack}>
											<span className={s.gainNew} style={{ width: `${gain.to}%` }} />
											<span className={s.gainOld} style={{ width: `${gain.from}%` }} />
										</span>
										<span className={s.gainNums}>
											{gain.from}→{gain.to}
											<span className={s.delta}>+{gain.to - gain.from}</span>
										</span>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</main>

			<Rail>
				<StatPills />
				<StreakCard />
				<DailyQuests />
				<ArenaCard />
			</Rail>
		</div>
	);
}
