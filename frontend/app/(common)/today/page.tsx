'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAccount } from '@/components/account-provider';
import { TargetIcon } from '@/components/icons';
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
const MINUTES_PER_QUESTION = 1.5;

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

					<article className={s.focus}>
						<span className={s.blobA} />
						<span className={s.blobB} />
						<div className={`${s.layer} ${s.tags}`}>
							{total > 0 && <span className={s.deadline}>HẠN HÔM NAY 23:59</span>}
							<span className={s.kicker}>{total ? 'VIỆC CHÍNH HÔM NAY' : 'BẮT ĐẦU TỪ ĐÂY'}</span>
						</div>
						<div className={`${s.layer} ${s.focusBody}`}>
							<div>
								<h1 className={s.focusTitle}>{total ? review?.title : 'Xếp lộ trình cho em'}</h1>
								<p className={s.focusCopy}>
									{total
										? `${total} câu trộn từ những gì em đã học. Xử xong là giữ lửa hôm nay.`
										: 'Chọn khối rồi làm bài xác định trình độ, mình xếp trạm hợp sức cho em.'}
								</p>
							</div>
							{total > 0 && (
								<div className={s.count}>
									{total}
									<small> câu</small>
									<div className={s.eta}>còn ~{Math.round(total * MINUTES_PER_QUESTION)} phút</div>
								</div>
							)}
						</div>
						{total > 0 && (
							<div className={`${s.layer} ${s.segs}`} style={{ gridTemplateColumns: `repeat(${Math.min(total, MAX_SEGMENTS)}, 1fr)` }}>
								{Array.from({ length: Math.min(total, MAX_SEGMENTS) }, (_, i) => (
									<span key={i} className={`${s.seg} ${i ? '' : s.next}`} />
								))}
							</div>
						)}
						<div className={`${s.layer} ${s.actions}`}>
							<Link href={review && total ? examHref(review.exam_id, 'review') : '/learning_path'} className={s.go}>
								{total ? 'BẮT ĐẦU NGAY' : 'VÀO LỘ TRÌNH'}
							</Link>
							{total > 0 && (
								<Link href="/practice" className={s.ghost}>
									Xem cả phiếu
								</Link>
							)}
						</div>
					</article>

					{step && (
						<Link href={examHref(step.id, step.mode)} className={`${s.next} ${step.bomb ? s.bomb : ''}`}>
							<span className={s.glyph} aria-hidden="true">
								{step.bomb ? '!' : step.mode === 'placement' ? <TargetIcon size={28} /> : step.short.replace('Trạm ', '').replace('Đích', '★')}
							</span>
							<div className={s.nextBody}>
								<div className={s.nextKicker}>
									{step.bomb ? 'GỠ BOM TRƯỚC' : 'KHUYÊN LÀM TRƯỚC'}
									{step.total > 0 && ` · ${step.total} CÂU`}
								</div>
								<div className={s.nextTitle}><MathInline text={step.title} /></div>
								<div className={s.nextCopy}>
									{step.bomb
										? 'Trạm vừa rồi chưa đủ điểm. Gỡ bom là mở trạm tiếp theo.'
										: step.mode === 'placement'
											? 'Làm vài câu để mình biết em đang ở đâu.'
											: 'Qua trạm này là mở khoá trạm tiếp theo.'}
								</div>
							</div>
							<span className={s.nextGo}>{step.bomb ? 'GỠ BOM →' : 'VÀO TRẠM →'}</span>
						</Link>
					)}

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
