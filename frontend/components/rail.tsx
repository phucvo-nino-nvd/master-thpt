'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { useLoad, useMounted } from '@/lib/api';
import { WEEKDAYS, examHref, hoursLeftToday, weekdayIndex } from '@/lib/format';
import { selectOfficialExam } from '@/lib/documents';
import { getDocuments } from '@/shared/api/client';
import { useAccount } from './account-provider';
import { BoltIcon, CheckIcon, FlameIcon, TargetIcon, TrophyIcon } from './icons';
import { Rive } from './rive';
import s from './rail.module.css';

export function Rail({ children }: { children: ReactNode }) {
	return <aside className={s.rail}>{children}</aside>;
}

export function StatPills() {
	const { account } = useAccount();

	return (
		<div className={s.pills}>
			<div className={s.pill}>
				<FlameIcon className={s.flicker} />
				{account.streak}
			</div>
			<div className={`${s.pill} ${s.xp}`}>
				<BoltIcon />
				{account.xp.toLocaleString('vi-VN')} XP
			</div>
		</div>
	);
}

export function StreakCard() {
	const { account } = useAccount();
	const today = useMounted() ? weekdayIndex() : -1;
	const copy = account.kept_today
		? 'Giữ lửa xong cho hôm nay. Mai quay lại nha.'
		: account.streak
			? 'Chưa giữ lửa hôm nay. Qua 1 trạm là được.'
			: 'Làm 1 bài hôm nay là nhóm lửa ngày đầu tiên.';

	return (
		<div className={`${s.streak} ${account.kept_today ? '' : s.cold}`}>
			<div className={s.streakHead}>
				<div className={s.streakArt}>
					<Rive src="streak" autobind vm={`streak=${account.streak}`} />
				</div>
				<div>
					<div className={s.streakDays}>{account.streak} ngày liền</div>
					<div className={s.streakCopy}>{copy}</div>
				</div>
			</div>
			<div className={s.week}>
				{WEEKDAYS.map((label, i) => (
					<div key={label} className={s.day}>
						{label}
						<span className={`${s.dot} ${account.week[i] ? s.done : i === today ? s.today : ''}`}>
							{account.week[i] && <CheckIcon />}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

export function DailyQuests() {
	const { account } = useAccount();
	const mounted = useMounted();

	if (!account.daily.length) return null;

	return (
		<div className={s.card}>
			<div className={s.cardHead}>
				Nhiệm vụ hằng ngày
				{mounted && <span className={s.badge}>Còn {hoursLeftToday()} tiếng</span>}
			</div>
			{account.daily.map((task, i) => (
				<div key={task.id} className={`${s.task} ${i % 2 ? s.indigo : ''}`}>
					<span className={s.taskIcon}>{i % 2 ? <TargetIcon stroke="#4A48E8" /> : <BoltIcon size={20} />}</span>
					<div className={s.taskBody}>
						<div className={s.taskTitle}>{task.title}</div>
						<div className={s.bar}>
							<span className={s.track}>
								<span className={s.fill} style={{ width: `${(100 * task.current) / task.target}%` }} />
							</span>
							<span className={s.num}>
								{task.current} / {task.target}
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export function ArenaCard() {
	const { account } = useAccount();
	const { data: documents, loading, error } = useLoad(getDocuments, []);
	const exam = selectOfficialExam(documents);

	if (loading) return null;

	return (
		<div className={s.arena}>
			<div className={s.arenaHead}>
				<span className={s.cup}>
					<TrophyIcon size={24} />
				</span>
				<div>
					<div className={s.kicker}>ĐẤU TRƯỜNG THI THỬ</div>
					<div className={s.arenaTitle}>
						{exam ? exam.title : 'Luyện thi với đề chính thức'}
					</div>
				</div>
			</div>
			<p className={s.arenaCopy}>
				{exam ? `${exam.total_questions} câu · ${exam.duration} phút` : error ? 'Chưa tải được đề chính thức. Em có thể thử lại trong Kho đề thi.' : 'Chưa có đề chính thức có nguồn trong kho.'}
				{exam && account.goal && (
					<>
						{' '}
						· Mục tiêu tối thiểu: <strong>{account.goal}.0 điểm</strong>
					</>
				)}
				{exam && '.'}
			</p>
			<Link href={exam ? examHref(exam.id, 'exam') : '/documents'} className={s.arenaButton}>
				{exam ? 'VÀO PHÒNG THI THỬ' : 'MỞ KHO ĐỀ THI'}
			</Link>
		</div>
	);
}
