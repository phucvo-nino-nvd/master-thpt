import type { HistoryMode, Quest, QuestStage, QuestStation } from '@/shared/api/client';

type QuestSpot = { stage: QuestStage; index: number; item: QuestStation };

type QuestStep = { id: string; title: string; short: string; mode: HistoryMode; bomb: boolean; total: number };

export const OBSTACLE_PREFIX = 'obstacle:';

export function locate(quest: Quest, id: string | null): QuestSpot | null {
	for (const stage of quest.stages) {
		if (stage.id === id) return { stage, index: -1, item: stage };
		const index = stage.stations.findIndex((station) => station.id === id);
		if (index >= 0) return { stage, index, item: stage.stations[index] };
	}

	return null;
}

export const shortName = ({ index }: QuestSpot) => (index < 0 ? 'Đích' : `Trạm ${index + 1}`);

export const fullName = (spot: QuestSpot) => `${shortName(spot)}: ${spot.index < 0 ? spot.stage.name : spot.item.name}`;

export function questStep(quest: Quest | null): QuestStep | null {
	if (!quest) return null;

	if (quest.obstacle) {
		const spot = locate(quest, quest.obstacle.id.slice(OBSTACLE_PREFIX.length));
		return {
			id: quest.obstacle.id,
			title: `Bom ôn tập: ${spot?.item.name ?? ''}`,
			short: 'Bom ôn tập',
			mode: 'obstacle',
			bomb: true,
			total: quest.obstacle.total_questions,
		};
	}

	if (!quest.placement.done) {
		return quest.placement.probe
			? { id: quest.placement.probe, title: 'Bài xác định trình độ', short: 'Bài xác định', mode: 'placement', bomb: false, total: 0 }
			: null;
	}

	const spot = locate(quest, quest.current);

	return spot
		? { id: spot.item.id, title: fullName(spot), short: shortName(spot), mode: 'checkpoint', bomb: false, total: spot.item.total_questions }
		: null;
}

export const questResultHref = (examId: string, correct: number, total: number, retake = false) =>
	`/learning_path?from=${encodeURIComponent(examId)}&correct=${correct}&total=${total}${retake ? '&retake=1' : ''}`;
