'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { useAccount } from '@/components/account-provider';
import { TrophyIcon } from '@/components/icons';
import page from '@/components/page.module.css';
import { ArenaCard, DailyQuests, Rail, StatPills, StreakCard } from '@/components/rail';
import { Rive } from '@/components/rive';
import { MathInline } from '@/features/exams/components/math-text';
import { useLoad } from '@/lib/api';
import { STREAK_MILESTONES, examHref, starSeq, streakHue, streakSeenKey } from '@/lib/format';
import { OBSTACLE_PREFIX, locate, shortName } from '@/lib/quest';
import { Quest, QuestStation, getQuest } from '@/shared/api/client';
import s from './quest.module.css';
import { BombPhase, StageMap } from './stage-map';

const STAGE_COLORS = ['var(--indigo)', '#0b8447', '#087fa3', '#b95b13', '#8645c1', '#bc3f70'];
const BOMB_POP_MS = 900;
const BOMB_DRAW_MS = 1600;
const SCROLL_SLACK = 40;

type Milestone = 'cleared' | 'goal' | 'streak' | null;

type QuestPageProps = { searchParams: { from?: string; correct?: string; total?: string; retake?: string } };

export default function QuestPage({ searchParams }: QuestPageProps) {
	const router = useRouter();
	const { account } = useAccount();
	const { data: quest, error } = useLoad<Quest | null>(getQuest, null);
	const [view, setView] = useState(0);
	const [pop, setPop] = useState<string | null>(null);
	const [shake, setShake] = useState({ id: '', count: 0 });
	const [wave, setWave] = useState(0);
	const [bombPhase, setBombPhase] = useState<BombPhase>('shown');
	const [milestone, setMilestone] = useState<Milestone>(null);
	const scrollRef = useRef<HTMLDivElement>(null);
	const dividers = useRef<(HTMLDivElement | null)[]>([]);
	const bombPlayed = useRef(false);
	const from = searchParams.from ?? '';
	const nextSpot = quest ? locate(quest, quest.current) : null;
	const fromSpot = quest && from ? locate(quest, from.replace(OBSTACLE_PREFIX, '')) : null;

	useEffect(() => {
		if (!quest) return;

		const index = Math.max(0, quest.stages.findIndex((stage) => stage.status !== 'passed'));
		const scroller = scrollRef.current;
		const divider = dividers.current[index];

		setView(index);
		if (scroller && divider) scroller.scrollTop = divider.offsetTop - scroller.offsetTop - 8;
	}, [quest]);

	useEffect(() => {
		if (!fromSpot || searchParams.retake || from.startsWith(OBSTACLE_PREFIX)) return;

		if (fromSpot.item.status === 'passed') {
			setMilestone(fromSpot.index < 0 ? 'goal' : 'cleared');
			return;
		}

		if (fromSpot.item.status !== 'blocked') return;

		setBombPhase('pop');
		const draw = setTimeout(() => setBombPhase('draw'), BOMB_POP_MS);
		const shown = setTimeout(() => {
			bombPlayed.current = true;
			setBombPhase('shown');
		}, BOMB_POP_MS + BOMB_DRAW_MS);

		return () => {
			clearTimeout(draw);
			clearTimeout(shown);
		};
	}, [fromSpot?.item.status]);

	useEffect(() => {
		if (milestone || bombPhase !== 'shown' || (from && !quest) || !account.kept_today || !STREAK_MILESTONES.includes(account.streak)) return;
		if (fromSpot?.item.status === 'blocked' && !searchParams.retake && !from.startsWith(OBSTACLE_PREFIX) && !bombPlayed.current) return;
		if (localStorage.getItem(streakSeenKey(account.streak))) return;
		setMilestone((current) => current ?? 'streak');
	}, [account.kept_today, account.streak, milestone, bombPhase, quest]);

	const closeMilestone = () => {
		if (milestone === 'streak') localStorage.setItem(streakSeenKey(account.streak), '1');
		setMilestone(null);
		setWave((n) => n + 1);
		if (from) router.replace('/learning_path');
	};

	const onScroll = () => {
		const scroller = scrollRef.current;
		if (!scroller) return;
		const index = dividers.current.findLastIndex((divider) => divider && divider.offsetTop - scroller.offsetTop - scroller.scrollTop <= SCROLL_SLACK);
		setView(Math.max(0, index));
	};

	const onTap = (item: QuestStation) => {
		setWave((n) => n + 1);
		if (item.status === 'locked') setShake((prev) => ({ id: item.id, count: prev.count + 1 }));
		setPop(pop === item.id ? null : item.id);
	};

	const stage = quest?.stages[view];
	const items = stage ? [...stage.stations, stage] : [];
	const passed = items.filter((item) => item.status === 'passed').length;
	const stageDone = stage?.status === 'passed';
	const stageLive = items.some((item) => item.status === 'current' || item.status === 'blocked');
	const nextShort = quest?.obstacle ? 'Bom ôn tập' : nextSpot ? shortName(nextSpot) : null;
	const nextId = quest?.obstacle ? 'bomb' : nextSpot?.item.id ?? null;

	return (
		<div className={page.withRail}>
			<main className={s.main}>
				<div className={s.top}>
					<div className={s.header} style={{ '--stage-color': STAGE_COLORS[view % STAGE_COLORS.length] } as CSSProperties}>
						<div>
							<div className={s.headerKicker}>
								{stage ? `CHẶNG ${view + 1} · ${stageDone ? 'ĐÃ HOÀN THÀNH' : stageLive ? 'ĐANG THỰC HIỆN' : 'CHƯA MỞ'}` : 'LỘ TRÌNH'}
							</div>
							<h1 className={s.headerTitle}><MathInline text={stage?.name ?? 'Lộ trình của em'} /></h1>
						</div>
						{stage && (
							<div className={s.headerSide}>
								<span className={s.headerCount}>
									{passed}/{items.length} trạm
								</span>
								<span className={s.headerBar}>
									<span style={{ width: `${(100 * passed) / items.length}%` }} />
								</span>
							</div>
						)}
					</div>
				</div>

				<div ref={scrollRef} className={s.scroll} onScroll={onScroll}>
					{error && <div className={page.error}>{error}</div>}

					{quest && !quest.placement.done && (
						<div className={s.start}>
							<div className={s.startBody}>
								<div className={s.startKicker}>BÀI XÁC ĐỊNH TRÌNH ĐỘ</div>
								<div className={s.startTitle}>Lộ trình Lớp 12</div>
								<div className={s.startCopy}>
									Làm vài câu để mình xếp trạm hợp sức cho em.
								</div>
							</div>
							{quest.placement.probe && (
								<Link href={examHref(quest.placement.probe, 'placement')} className={s.startGo}>
									LÀM BÀI XÁC ĐỊNH →
								</Link>
							)}
						</div>
					)}

					{pop && <div className={s.backdrop} onClick={() => setPop(null)} />}

					{quest?.stages.map((entry, i) => (
						<div key={entry.id}>
							<div
								ref={(node) => {
									dividers.current[i] = node;
								}}
								className={s.divider}
							>
								Chặng {i + 1} · <MathInline text={entry.name} />
							</div>
							<StageMap
								stage={entry}
								order={i}
								obstacle={quest.obstacle}
								bombPhase={bombPhase}
								pop={pop}
								shake={shake}
								nextShort={nextShort}
								nextId={nextId}
								goal={account.goal}
								wave={wave}
								onTap={onTap}
								onPop={setPop}
							/>
						</div>
					))}
				</div>
			</main>

			<Rail>
				<StatPills />
				<StreakCard />
				<DailyQuests />
				<ArenaCard />
			</Rail>

			{milestone === 'cleared' && fromSpot && (
				<div className={s.overlay}>
					<div className={s.modal}>
						<div className={s.modalArt}>
							<div className={s.warrior}>
								<Rive src="warrior" fireseq={starSeq(Number(searchParams.correct), Number(searchParams.total))} />
							</div>
						</div>
						<div className={s.modalKicker}>{shortName(fromSpot).toUpperCase()} · XONG</div>
						<h2 className={s.modalTitle}>Qua trạm rồi nè!</h2>
						<p className={s.modalCopy}>
							<MathInline text={fromSpot.item.name} />: qua rồi. {nextSpot ? `${shortName(nextSpot)} mở khoá rồi.` : ''}
						</p>
						<div className={s.tiles}>
							<div className={s.tile}>
								<b>{account.xp.toLocaleString('vi-VN')}</b>TỔNG XP
							</div>
							<div className={s.tile}>
								<b>{account.streak}</b>NGÀY LIỀN
							</div>
							<div className={s.tile}>
								<b>
									{searchParams.correct ?? '–'}/{searchParams.total ?? '–'}
								</b>
								ĐÚNG
							</div>
						</div>
						<button type="button" className={s.modalButton} onClick={closeMilestone}>
							TIẾP TỤC
						</button>
					</div>
				</div>
			)}

			{(milestone === 'goal' || milestone === 'streak') && (
				<div className={s.overlay}>
					<div className={s.modal}>
						<div className={s.modalArt}>
							<div className={`${s.burst} ${milestone === 'goal' ? s.gold : s.fire}`}>
								<div>
									<Rive src="burst" autobind artboard="Content" />
								</div>
							</div>
							<div className={`${s.medal} ${milestone === 'goal' ? '' : s.fire}`}>
								{milestone === 'goal' ? <TrophyIcon size={88} /> : <Rive src="streak" autobind vm={`streak=${account.streak}`} style={{ filter: streakHue(account.streak) }} />}
							</div>
						</div>
						{milestone === 'streak' && <div className={`${s.modalKicker} ${s.fire}`}>{account.streak === 1 ? 'NGỌN LỬA ĐẦU TIÊN' : 'MỐC STREAK MỚI'}</div>}
						<h2 className={s.modalTitle}>{milestone === 'goal' ? 'Về đích rồi!' : `${account.streak} ngày liền!`}</h2>
						<p className={s.modalCopy}>
							<MathInline text={milestone === 'goal'
								? `Xong ${fromSpot?.stage.name ?? 'chặng này'}. Cúp chặng về tủ rồi nha.`
								: account.streak === 1
									? 'Lửa đã nhóm rồi nè. Mai quay lại làm 1 câu là giữ được lửa.'
									: 'Không bỏ buổi nào luôn. Giữ nhịp này tới ngày thi là ngon.'} />
						</p>
						<button type="button" className={`${s.modalButton} ${milestone === 'goal' ? s.gold : s.fire}`} onClick={closeMilestone}>
							{milestone === 'goal' ? 'NHẬN CÚP' : 'GIỮ LỬA TIẾP'}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
