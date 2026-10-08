import type { Quest } from '@/shared/api/client';
import { OBSTACLE_PREFIX, fullName, locate } from './quest';

export function historyTitle(examId: string, titles: ReadonlyMap<string, string>, quest: Quest | null, fallback = examId): string {
	const title = titles.get(examId);
	if (title !== undefined) return title;
	if (examId.startsWith('review:')) return 'Nhiệm vụ hôm nay';
	const spot = quest && locate(quest, examId.replace(OBSTACLE_PREFIX, ''));
	if (!spot) return fallback;
	return examId.startsWith(OBSTACLE_PREFIX) ? `Bom ôn tập: ${spot.item.name}` : fullName(spot);
}
