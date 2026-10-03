import { dayKey } from '@/lib/format';
import type { Account, DocumentItem, ExamQuestion, HistoryDetail, KnowledgeNode, Quest } from './client';

type MockDb = {
	account: Account;
	documents: DocumentItem[];
	questions: ExamQuestion[];
	papers: Record<string, string[]>;
	review: string[];
	history: HistoryDetail[];
	knowledge: KnowledgeNode[];
	quest: Quest;
	hints: Record<string, string[]>;
	solutions: Record<string, string>;
};

const DAY = 86400000;

const daysAgo = (days: number, hour = 20) => {
	const date = new Date(Date.now() - days * DAY);
	date.setHours(hour, 14, 0, 0);
	return date.toISOString();
};

const weekdayIndex = (new Date().getDay() + 6) % 7;

let seed = 11;
const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

const activity = Array.from({ length: 235 }, (_, i) => ({
	date: dayKey(new Date(daysAgo(235 - i))),
	count: i > 222 ? 4 + Math.round(random() * 8) : random() < 0.3 ? 0 : 1 + Math.round(random() * 17),
})).filter((day) => day.count > 0);

const mc = (id: string, section: string, number: number, content: string, options: string[], answer = 'A'): ExamQuestion => ({
	id,
	section,
	number,
	type: 'multiple_choice',
	content,
	options: options.map((text, i) => ({ label: 'ABCD'[i], content: text })),
	parts: [],
	images: [],
	answer,
});

const MC = 'Phần I · Trắc nghiệm nhiều lựa chọn';
const TF = 'Phần II · Trắc nghiệm Đúng / Sai';
const SA = 'Phần III · Trả lời ngắn';

const QUESTIONS: ExamQuestion[] = [
	mc('q-01', MC, 1, 'Họ tất cả các nguyên hàm của hàm số $f(x) = 3x^2 + 2\\sin x$ là:', ['$x^3 - 2\\cos x + C$', '$x^3 + 2\\cos x + C$', '$6x + 2\\cos x + C$', '$x^3 - \\cos x + C$']),
	mc('q-02', MC, 2, 'Cho $\\int_0^2 f(x) dx = 3$ và $\\int_0^2 g(x) dx = -1$. Tính $I = \\int_0^2 [2f(x) - 3g(x)] dx$.', ['$I = 9$', '$I = 3$', '$I = -9$', '$I = 7$']),
	mc('q-03', MC, 3, 'Với $u = 2x + 1$, tích phân $\\int_0^1 (2x + 1)^4 dx$ trở thành:', ['$\\frac{1}{2}\\int_1^3 u^4 du$', '$\\int_1^3 u^4 du$', '$2\\int_1^3 u^4 du$', '$\\frac{1}{2}\\int_0^1 u^4 du$']),
	mc('q-04', MC, 4, 'Tính tích phân từng phần $I = \\int_0^1 x e^x dx$.', ['$1$', '$e - 1$', '$e$', '$2e - 1$']),
	mc('q-05', MC, 5, 'Cho $f(x)$ liên tục trên $\\mathbb{R}$ và $\\int_0^4 f(x) dx = 10$. Tính $J = \\int_0^2 f(2x) dx$.', ['$J = 5$', '$J = 20$', '$J = 10$', '$J = 2.5$']),
	mc('q-06', MC, 6, 'Cho hàm số $f(x) = x^3 - 3x^2 + 2$. Giá trị nhỏ nhất của hàm số trên đoạn $[0; 3]$ là:', ['$-2$', '$-1$', '$0$', '$2$']),
	mc('q-07', MC, 7, 'Tiệm cận ngang của đồ thị hàm số $y = \\frac{2x - 1}{x + 1}$ là đường thẳng:', ['$y = 2$', '$x = -1$', '$y = -1$', '$x = 2$']),
	mc('q-08', MC, 8, 'Thể tích khối lăng trụ có diện tích đáy $B = 6$ và chiều cao $h = 4$ là:', ['$V = 24$', '$V = 8$', '$V = 12$', '$V = 72$']),
	{
		id: 'q-09',
		section: TF,
		number: 9,
		type: 'true_false',
		content: 'Cho hàm số $f(x) = x \\cos x$. Xét tính đúng sai của các mệnh đề sau:',
		options: [],
		parts: [
			{ label: 'a', content: "Đạo hàm $f'(x) = \\cos x - x \\sin x$." },
			{ label: 'b', content: '$F(x) = x \\sin x + \\cos x$ là một nguyên hàm của $f(x)$.' },
			{ label: 'c', content: '$\\int_0^{\\pi/2} x \\cos x dx = \\frac{\\pi}{2} - 1$.' },
			{ label: 'd', content: '$\\int_0^\\pi x \\cos x dx = 0$.' },
		],
		images: [],
		answer: [true, true, true, false],
	},
	{
		id: 'q-10',
		section: SA,
		number: 10,
		type: 'short_answer',
		content: 'Một vật chuyển động với vận tốc $v(t) = 3t^2 + 2t$ (m/s). Tính quãng đường vật đi được trong 3 giây đầu tiên (mét).',
		options: [],
		parts: [],
		images: [],
		answer: '36',
	},
];

const ALL = QUESTIONS.map((question) => question.id);

export const ACCOUNT: MockDb = {
	account: {
		name: 'Gia Bảo',
		grade: 12,
		goal: 8,
		avatar: 0,
		plan: 'free',
		joined_at: daysAgo(235),
		xp: 1240,
		streak: 12,
		kept_today: false,
		week: Array.from({ length: 7 }, (_, i) => i < weekdayIndex),
		daily: [
			{ id: 'insight', title: 'Tích lũy 30 Điểm thấu hiểu', current: 18, target: 30 },
			{ id: 'combo', title: 'Đúng 3 câu Tích phân liên tiếp', current: 1, target: 3 },
		],
		gains: [
			{ name: 'Đổi biến', from: 62, to: 81 },
			{ name: 'Nguyên hàm cơ bản', from: 74, to: 88 },
			{ name: 'Đạo hàm ln x', from: 85, to: 92 },
		],
		activity,
		saved_exam_ids: ['off-2025'],
		settings: { remind: true, sound: true, minutes: 20, daily_goal: 10 },
	},

	documents: [
		{ id: 'mock-3', title: 'Thi thử lần 3 · Toán 12', subject: 'Toán', grade: 12, year: 2026, source: 'Kho Master', total_questions: 8, duration: 90, is_completed: false },
		{ id: 'off-2025', title: 'Kỳ thi tốt nghiệp THPT 2025 · Môn Toán', subject: 'Toán', grade: 12, year: 2025, source: 'Bộ GD&ĐT', total_questions: 10, duration: 90, is_completed: false },
		{ id: 'ref-2025', title: 'Đề tham khảo tốt nghiệp THPT 2025', subject: 'Toán', grade: 12, year: 2025, source: 'Bộ GD&ĐT', total_questions: 6, duration: 90, is_completed: false },
		{ id: 'mock-2', title: 'Thi thử lần 2 · Toán 12', subject: 'Toán', grade: 12, year: 2026, source: 'Kho Master', total_questions: 8, duration: 90, is_completed: true },
		{ id: 'off-2024', title: 'Kỳ thi tốt nghiệp THPT 2024 · Môn Toán', subject: 'Toán', grade: 12, year: 2024, source: 'Bộ GD&ĐT', total_questions: 10, duration: 90, is_completed: false },
	],

	questions: QUESTIONS,

	papers: {
		'mock-3': ALL.slice(0, 8),
		'off-2025': ALL,
		'ref-2025': ALL.slice(2, 8),
		'mock-2': ALL.slice(0, 8),
		'off-2024': ALL,
	},

	review: ['q-04', 'q-03', 'q-05', 'q-02', 'q-09', 'q-10', 'q-01', 'q-06', 'q-07', 'q-08'],

	history: [
		{
			history_id: 'h-4',
			exam_id: 'mock-2',
			mode: 'exam',
			total_score: 7.6,
			correct_count: 6,
			total_questions: 8,
			duration_seconds: 5040,
			created_at: daysAgo(2, 9),
			questions: [
				{ question_id: 'q-01', student_answer: 'A', evaluation: { score: 1.25, correct: true, part_correct: [], feedback: 'Chính xác! Nguyên hàm của $\\sin x$ là $-\\cos x$.' } },
				{ question_id: 'q-04', student_answer: 'B', evaluation: { score: 0, correct: false, part_correct: [], feedback: 'Em quên trừ $\\int_0^1 e^x dx = e - 1$, nên $I = e - (e - 1) = 1$.' } },
			],
		},
		{ history_id: 'h-3', exam_id: 'st-2-3', mode: 'checkpoint', total_score: 4, correct_count: 2, total_questions: 5, duration_seconds: 1080, created_at: daysAgo(3, 19), questions: [] },
		{ history_id: 'h-2', exam_id: 'st-2-2', mode: 'checkpoint', total_score: 9, correct_count: 9, total_questions: 10, duration_seconds: 1620, created_at: daysAgo(5, 21), questions: [] },
		{ history_id: 'h-1', exam_id: 'st-2-1', mode: 'checkpoint', total_score: 10, correct_count: 6, total_questions: 6, duration_seconds: 900, created_at: daysAgo(8, 20), questions: [] },
	],

	knowledge: [
		{ id: 'k-parts', label: 'Tích phân từng phần', grade: 12, status: 'weak', score: 34 },
		{ id: 'k-bounds', label: 'Đổi cận', grade: 12, status: 'learning', score: 57 },
		{ id: 'k-subst', label: 'Đổi biến', grade: 12, status: 'mastered', score: 81 },
		{ id: 'k-basic', label: 'Nguyên hàm cơ bản', grade: 12, status: 'mastered', score: 88 },
	],

	quest: {
		placement: { done: true, grade: 12, probe: null, start: 'st-1-1' },
		current: 'st-2-3',
		obstacle: null,
		missing: [],
		skip_review: [],
		stages: [
			{
				id: 'stage-1',
				name: 'Hàm số & Khảo sát đồ thị',
				total_questions: 24,
				status: 'passed',
				stations: [
					{ id: 'st-1-1', name: 'Tính đơn điệu & Cực trị', total_questions: 8, status: 'passed' },
					{ id: 'st-1-2', name: 'Tiệm cận & Đồ thị hàm số', total_questions: 10, status: 'passed' },
					{ id: 'st-1-3', name: 'Tương giao đồ thị hàm số', total_questions: 6, status: 'passed' },
				],
			},
			{
				id: 'stage-2',
				name: 'Nguyên hàm & Tích phân',
				total_questions: 26,
				status: 'locked',
				stations: [
					{ id: 'st-2-1', name: 'Đạo hàm ln x', total_questions: 6, status: 'passed' },
					{ id: 'st-2-2', name: 'Nguyên hàm cơ bản', total_questions: 10, status: 'passed' },
					{ id: 'st-2-3', name: 'Tích phân từng phần', total_questions: 5, status: 'current' },
					{ id: 'st-2-4', name: 'Tích phân xác định', total_questions: 5, status: 'locked' },
				],
			},
			{
				id: 'stage-3',
				name: 'Ứng dụng tích phân',
				total_questions: 12,
				status: 'locked',
				stations: [
					{ id: 'st-3-1', name: 'Diện tích hình phẳng', total_questions: 6, status: 'locked' },
					{ id: 'st-3-2', name: 'Thể tích khối tròn xoay', total_questions: 6, status: 'locked' },
				],
			},
		],
	},

	hints: {
		'q-04': [
			'Áp dụng $\\int u dv = uv - \\int v du$ với $u = x$, $dv = e^x dx$.',
			'Từ $u = x$ suy ra $du = dx$; từ $dv = e^x dx$ suy ra $v = e^x$.',
			'$I = [x e^x]_0^1 - \\int_0^1 e^x dx = e - (e - 1) = 1$.',
		],
		'q-06': [
			"Tính $f'(x)$ rồi tìm nghiệm trong đoạn $[0; 3]$.",
			"$f'(x) = 3x^2 - 6x = 0$ khi $x = 0$ hoặc $x = 2$.",
			'So sánh $f(0) = 2$, $f(2) = -2$, $f(3) = 2$.',
		],
	},

	solutions: {
		'q-04': 'Đặt $u = x$, $dv = e^x dx$ nên $du = dx$, $v = e^x$.\n$$I = [x e^x]_0^1 - \\int_0^1 e^x dx = e - (e - 1) = 1.$$\nĐáp án A.',
		'q-06': "$f'(x) = 3x^2 - 6x = 0 \\iff x = 0$ hoặc $x = 2$.\nSo sánh $f(0) = 2$, $f(2) = -2$, $f(3) = 2$ nên $\\min f = -2$. Đáp án A.",
	},
};
