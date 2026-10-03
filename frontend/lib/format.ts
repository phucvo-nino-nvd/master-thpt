import type { HistoryMode } from '@/shared/api/client';

export type DocKind = 'official' | 'ref' | 'mock';

const REF_RE = /tham khảo|minh ho[ạa]/i;
const MOCK_RE = /thi thử/i;

export const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

export const WEEKDAY_NAMES = ['CHỦ NHẬT', 'THỨ HAI', 'THỨ BA', 'THỨ TƯ', 'THỨ NĂM', 'THỨ SÁU', 'THỨ BẢY'];

export const docKind = (title: string): DocKind => (REF_RE.test(title) ? 'ref' : MOCK_RE.test(title) ? 'mock' : 'official');

export const examHref = (id: string, mode?: HistoryMode) =>
	`/exams/${encodeURIComponent(id)}${mode ? `?mode=${mode}` : ''}`;

export const weekdayIndex = (date = new Date()) => (date.getDay() + 6) % 7;

export const score = (value: number) => value.toFixed(1).replace('.', ',');

export const hoursLeftToday = () => 24 - new Date().getHours();

export const dayKey = (date: Date) =>
	`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
