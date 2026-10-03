'use client';

import Link from 'next/link';
import { CheckIcon, LockIcon } from '@/components/icons';
import { Rive } from '@/components/rive';
import { MathInline } from '@/features/exams/components/math-text';
import { examHref } from '@/lib/format';
import type { Quest, QuestStage, QuestStation } from '@/shared/api/client';
import s from './quest.module.css';

const ROW = 178;
const CENTER = 260;
const TOP = 70;
const SWING = 110;
const BOMB_REACH = 0.8;
const MASCOT_SIZE = 180;
const CHEST_COLORS = ['', 'green', 'blue', 'red'];

export type BombPhase = 'pop' | 'draw' | 'shown';

type Point = [number, number];

type StageMapProps = {
	stage: QuestStage;
	order: number;
	obstacle: Quest['obstacle'];
	bombPhase: BombPhase;
	pop: string | null;
	shake: { id: string; count: number };
	nextShort: string | null;
	nextId: string | null;
	goal: number | null;
	wave: number;
	onTap: (item: QuestStation) => void;
	onPop: (id: string | null) => void;
};

const curve = (points: Point[]) =>
	points.reduce((d, [x1, y1], i) => {
		if (!i) return `M${x1} ${y1}`;
		const [x0, y0] = points[i - 1];
		const h = (y1 - y0) / 2;
		return `${d} C${x0} ${y0 + h} ${x1} ${y1 - h} ${x1} ${y1}`;
	}, '');

export function StageMap({ stage, order, obstacle, bombPhase, pop, shake, nextShort, nextId, goal, wave, onTap, onPop }: StageMapProps) {
	const items = [...stage.stations, stage];
	const last = items.length - 1;
	const points = items.map((_, i): Point => [CENTER + (i === last ? 0 : i % 2 ? SWING : -SWING), TOP + i * ROW]);
	const head = items.findIndex((item) => item.status !== 'passed');
	const bombAt = obstacle ? items.findIndex((item) => item.status === 'blocked') : -1;

	let bomb: Point | null = null;
	let after: Point | null = null;

	if (bombAt >= 0) {
		const [x0, y0] = points[bombAt];
		after = points[bombAt + 1] ?? [CENTER, y0 + ROW];
		bomb = [after[0] + ((after[0] - x0) || SWING) * BOMB_REACH, (y0 + after[1]) / 2];
	}

	const route = bomb ? [...points.slice(0, bombAt + 1), bomb, ...points.slice(bombAt + 1)] : points;
	const at = (i: number) => (bomb && i > bombAt ? i + 1 : i);
	const segment = (a: number, b: number) => curve(route.slice(at(a), at(b) + 1));
	const height = TOP + last * ROW + 120 + (bomb && bombAt === last ? ROW : 0);
	const labelAt = items.findIndex((item) => item.status === 'current' || (item.status === 'blocked' && !obstacle));
	const nest = items.findIndex((_, r) => r > 0 && r < last && r % 2 === order % 2 && r !== labelAt && r !== bombAt && r !== bombAt + 1);
	const stationsLeft = items.slice(Math.max(head, 0), last).length;
	const tint = CHEST_COLORS[order % CHEST_COLORS.length];

	const nameOf = (i: number) => (i === last ? `Đích: ${stage.name}` : `Trạm ${i + 1}: ${items[i].name}`);

	const subOf = (item: QuestStation, i: number) => {
		const target = goal ? `Mục tiêu ${goal}.0+` : 'Rương thưởng';
		if (item.status === 'passed') return i === last ? 'Về đích · đã mở rương' : `Đã vững · ${item.total_questions} câu`;
		if (item.status === 'blocked') return 'Chưa đủ điểm';
		if (item.status === 'current') return i === last ? `${target} · sẵn sàng` : `Đang mở · ${item.total_questions} câu`;
		return i === last ? target : 'Đang khoá';
	};

	const popOf = (item: QuestStation, i: number) => {
		const finish = i === last;

		if (item.status === 'passed') {
			return {
				copy: finish ? 'Rương thưởng chặng này đã mở.' : `Qua rồi nè. Muốn ôn lại thì làm thêm một lượt ${item.total_questions} câu.`,
				cta: finish ? 'Thi lại đích' : 'Luyện tập lại',
				tone: finish ? s.gold : s.green,
				href: `${examHref(item.id, 'checkpoint')}&retake=1`,
			};
		}

		if (item.status === 'current') {
			return {
				copy: finish ? `Bài thi cuối chặng ${stage.name}. Vào thi là biết trình.` : `${item.total_questions} câu. Qua trạm này là mở khoá trạm tiếp theo.`,
				cta: finish ? 'Vào thi đích →' : 'Bắt đầu vượt trạm →',
				tone: finish ? s.gold : '',
				href: examHref(item.id, 'checkpoint'),
			};
		}

		if (item.status === 'blocked') {
			return { copy: 'Chưa đủ điểm để qua. Gỡ bom ôn tập bên cạnh rồi đi tiếp nha.', cta: 'Tới bom ngay →', tone: s.coral, action: () => onPop('bomb') };
		}

		return {
			copy: finish ? `Còn ${stationsLeft} trạm nữa là tới.` : `Khoá rồi nha. Qua ${nextShort ?? 'trạm trước'} trước đã.`,
			cta: nextShort ? `Đến ${nextShort} ngay →` : '',
			tone: '',
			action: () => onPop(nextId),
		};
	};

	return (
		<div className={s.map} style={{ height }}>
			<svg className={s.svg} width="520" height={height} aria-hidden="true">
				<path className={s.path} d={head < 0 ? '' : segment(bomb ? bombAt + 1 : head, last)} stroke="#D3D6E0" />
				<path className={s.path} d={segment(0, head < 0 ? last : head)} stroke="#14B866" />
			</svg>

			{bomb && after && bombPhase !== 'pop' && (
				<svg className={s.svg} width="520" height={height} aria-hidden="true">
					{bombPhase === 'draw' && (
						<defs>
							<mask id={`bomb-a-${stage.id}`} maskUnits="userSpaceOnUse" x="-100" y="-100" width="720" height={height + 200}>
								<path className={s.drawMask} d={curve([points[bombAt], bomb])} pathLength={100} />
							</mask>
							<mask id={`bomb-b-${stage.id}`} maskUnits="userSpaceOnUse" x="-100" y="-100" width="720" height={height + 200}>
								<path className={`${s.drawMask} ${s.later}`} d={curve([bomb, after])} pathLength={100} />
							</mask>
						</defs>
					)}
					<path className={s.path} d={curve([points[bombAt], bomb])} stroke="#F2542D" mask={bombPhase === 'draw' ? `url(#bomb-a-${stage.id})` : undefined} />
					{bombAt < last && (
						<path className={s.path} d={curve([bomb, after])} stroke="#D3D6E0" mask={bombPhase === 'draw' ? `url(#bomb-b-${stage.id})` : undefined} />
					)}
				</svg>
			)}

			{bomb && obstacle && (
				<div className={`${s.node} ${pop === 'bomb' ? s.open : ''}`} style={{ left: bomb[0], top: bomb[1] }}>
					<button type="button" className={s.bomb} title="Bom ôn tập" onClick={() => onPop(pop === 'bomb' ? null : 'bomb')}>
						<div className={s.bombArt}>
							<Rive src="bomb" knockout fit="cover" />
						</div>
					</button>
					{bombPhase === 'shown' && (
						<div className={`${s.label} ${s.blocked} ${s.labelIn} ${bomb[0] > CENTER ? s.left : s.right}`} onClick={() => onPop('bomb')}>
							<span className={s.labelName}>Bom ôn tập: <MathInline text={items[bombAt].name} /></span>
							<span className={s.labelSub}>Gỡ bom · {obstacle.total_questions} câu</span>
						</div>
					)}
					{pop === 'bomb' && (
						<div className={s.pop}>
							<div className={s.popCard}>
								<div className={s.popTitle}>Bom ôn tập</div>
								<p className={s.popCopy}>
									{obstacle.total_questions} câu kiểu em vừa sai ở <MathInline text={nameOf(bombAt)} />. Gỡ xong là được thử lại trạm.
								</p>
								<Link href={examHref(obstacle.id, 'obstacle')} className={`${s.cta} ${s.coral}`}>
									Gỡ bom →
								</Link>
							</div>
						</div>
					)}
				</div>
			)}

			{nest > 0 && (
				<div className={s.mascot} style={{ left: CENTER + Math.sign(CENTER - points[nest][0]) * (SWING + 175) - MASCOT_SIZE / 2, top: points[nest][1] - MASCOT_SIZE / 2 }}>
					<Rive src="mascot_hello" knockout fit="cover" fireonload trigger={`clic salut|${wave}`} bool="detect mouse=true" />
				</div>
			)}

			{items.map((item, i) => {
				const open = pop === item.id;
				const finish = i === last;
				const popover = popOf(item, i);
				const tap = () => onTap(item);

				return (
					<div key={item.id} className={`${s.node} ${open ? s.open : ''}`} style={{ left: points[i][0], top: points[i][1] }}>
						{finish ? (
							<button
								key={shake.id === item.id ? `${item.id}-${shake.count}` : item.id}
								type="button"
								aria-label={nameOf(i)}
								onClick={tap}
								className={`${s.press} ${s.chest} ${item.status === 'locked' ? s.locked : ''} ${shake.id === item.id ? s.shake : ''}`}
							>
								<span className={s.chestArt} aria-hidden="true">
									<Rive
										src="chest"
										artboard="Sanduk"
										trigger={item.status === 'passed' ? 'open' : 'close'}
										fireseq={[tint && `color ${tint}|1|50`, item.status === 'passed' && 'open|1|100'].filter(Boolean).join(';') || undefined}
										knockout
									/>
								</span>
							</button>
						) : item.status === 'current' ? (
							<div className={s.active}>
								<span className={s.halo} />
								<svg className={s.ring} width="108" height="108" viewBox="0 0 108 108" aria-hidden="true">
									<circle cx="54" cy="54" r="50" fill="none" stroke="#E4E5F0" strokeWidth="6" />
								</svg>
								<button type="button" aria-label={nameOf(i)} onClick={tap} className={`${s.press} ${s.activeButton}`}>
									{i + 1}
								</button>
							</div>
						) : (
							<button
								key={shake.id === item.id ? `${item.id}-${shake.count}` : item.id}
								type="button"
								aria-label={nameOf(i)}
								onClick={tap}
								className={`${s.press} ${s.station} ${item.status === 'blocked' ? s.fail : ''} ${item.status === 'locked' ? s.locked : ''} ${shake.id === item.id ? s.shake : ''}`}
							>
								{item.status === 'passed' ? <CheckIcon size={28} strokeWidth={3.4} /> : item.status === 'blocked' ? '!' : <LockIcon />}
							</button>
						)}

						{i === labelAt && (
							<div className={`${s.label} ${s[item.status]} ${points[i][0] <= CENTER ? s.right : s.left}`} onClick={tap}>
								<span className={s.labelName}><MathInline text={nameOf(i)} /></span>
								<span className={s.labelSub}>{subOf(item, i)}</span>
							</div>
						)}

						{open && (
							<div className={s.pop}>
								<div className={s.popCard}>
									<div className={s.popTitle}><MathInline text={nameOf(i)} /></div>
									<p className={s.popCopy}><MathInline text={popover.copy} /></p>
									{popover.href ? (
										<Link href={popover.href} className={`${s.cta} ${popover.tone}`}>
											{popover.cta}
										</Link>
									) : (
										popover.cta && (
											<button type="button" className={`${s.cta} ${popover.tone}`} onClick={popover.action}>
												{popover.cta}
											</button>
										)
									)}
								</div>
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}
