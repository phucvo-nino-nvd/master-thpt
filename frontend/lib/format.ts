import type { HistoryMode, KnowledgeNode } from '@/shared/api/client';

export type DocKind = 'official' | 'ref' | 'mock';

const REF_RE = /tham khảo|minh ho[ạa]/i;
const MOCK_RE = /thi thử/i;

export const XP_PER_CORRECT = 4;

export const STREAK_MILESTONES = [1, 7, 14, 30, 100, 365];

const STREAK_HUES = [0, -15, -28, -42, -110, -180];

export const WEAK_LIMIT = 3;

export const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

export const WEEKDAY_NAMES = ['CHỦ NHẬT', 'THỨ HAI', 'THỨ BA', 'THỨ TƯ', 'THỨ NĂM', 'THỨ SÁU', 'THỨ BẢY'];

export const docKind = (title: string): DocKind => (REF_RE.test(title) ? 'ref' : MOCK_RE.test(title) ? 'mock' : 'official');

export const examHref = (id: string, mode?: HistoryMode) =>
	`/exams/${encodeURIComponent(id)}${mode ? `?mode=${mode}` : ''}`;

export const weakest = (nodes: KnowledgeNode[]) =>
	nodes
		.filter((node) => node.score !== null)
		.sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
		.slice(0, WEAK_LIMIT);

export const weekdayIndex = (date = new Date()) => (date.getDay() + 6) % 7;

export const starSeq = (correct: number, total: number) => {
	const stars = total ? Math.round((3 * correct) / total) : 0;
	return stars ? `switch|${stars}|650` : undefined;
};

export const score = (value: number) => value.toFixed(1).replace('.', ',');

export const hoursLeftToday = () => 24 - new Date().getHours();

export const dayKey = (date: Date) =>
	`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export const streakSeenKey = (streak: number) => `streak-milestone-${streak}`;

export const streakHue = (streak: number) => `hue-rotate(${STREAK_HUES[Math.max(0, STREAK_MILESTONES.findLastIndex((value) => value <= streak))]}deg)`;
