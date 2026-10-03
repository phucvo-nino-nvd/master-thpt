import axios, { AxiosAdapter } from 'axios';

export const MOCK_ACCOUNT = process.env.MOCK_ACCOUNT?.toLowerCase() === 'true';

type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer';

export type ExamQuestion = {
	id: string;
	section: string;
	number: number;
	type: QuestionType;
	content: string;
	options: { label: string; content: string }[];
	parts: { label: string; content: string; solution?: string }[];
	images: { url: string; alt?: string | null }[];
	answer: string | boolean[];
	station?: string;
};

export type Exam = {
	exam_id: string;
	title: string;
	subject: string;
	grade: number;
	total_questions: number;
	duration_minutes: number;
	questions: ExamQuestion[];
};

export type DocumentItem = {
	id: string;
	title: string;
	subject: string;
	grade: number;
	year: number | null;
	source: string;
	total_questions: number;
	duration: number;
	is_completed: boolean;
};

export type AnswerPayload = string | boolean[];

export type Evaluation = {
	score: number;
	correct: boolean;
	part_correct: boolean[];
	feedback: string;
};

export type HistoryMode = 'exam' | 'practice' | 'placement' | 'checkpoint' | 'obstacle' | 'review' | 'skip';

export type SubmitExamBody = {
	exam_id: string;
	answers: { question_id: string; student_answer: AnswerPayload }[];
	duration_seconds?: number;
	mode?: HistoryMode;
	guest?: boolean;
};

export type SubmitExamResponse = {
	exam_id: string;
	history_id: string;
	total_score: number;
	correct_count: number;
	per_question: Record<string, Evaluation>;
};

type HistoryItem = {
	history_id: string;
	exam_id: string;
	mode: HistoryMode;
	total_score: number;
	correct_count: number;
	total_questions: number;
	duration_seconds: number | null;
	created_at: string;
};

export type HistoryDetail = HistoryItem & {
	questions: { question_id: string; student_answer: AnswerPayload; evaluation: Evaluation }[];
};

export type KnowledgeNode = {
	id: string;
	label: string;
	grade: number;
	status: 'weak' | 'learning' | 'mastered' | 'untouched';
	score: number | null;
};

export type KnowledgeGraph = {
	nodes: KnowledgeNode[];
	edges: { source: string; target: string; relation: string }[];
	streak: number;
};

type QuestStatus = 'passed' | 'current' | 'blocked' | 'locked';

export type QuestStation = {
	id: string;
	name: string;
	total_questions: number;
	status: QuestStatus;
};

export type QuestStage = QuestStation & { stations: QuestStation[] };

export type Quest = {
	placement: { done: boolean; grade: number | null; probe: string | null; start: string | null };
	current: string | null;
	obstacle: { id: string; depth: number; knowledge_ids: string[]; total_questions: number } | null;
	missing: string[];
	skip_review: string[];
	stages: QuestStage[];
};

type Plan = 'free' | 'pro';

export type Account = {
	name: string;
	grade: number | null;
	goal: number | null;
	avatar: number;
	plan: Plan;
	joined_at: string | null;
	xp: number;
	streak: number;
	kept_today: boolean;
	week: boolean[];
	daily: { id: string; title: string; current: number; target: number }[];
	gains: { name: string; from: number; to: number }[];
	activity: { date: string; count: number }[];
	saved_exam_ids: string[];
	settings: { remind: boolean; sound: boolean; minutes: number; daily_goal: number };
};

export type AccountUpdate = Partial<Omit<Account, 'settings'>> & { settings?: Partial<Account['settings']> };

type IngestSource = { url: string; title: string; score: number };
export type IngestState = {
	manual: boolean;
	batches: { request: { concept: string; grade: number }; docs: IngestSource[] }[];
};
export type PracticeStatus = { concept: string | null; stage: string | null; step: number; total: number };
export type ProcessingSnapshot = { ingest: IngestState; practice: PracticeStatus; grading: { exam_id: string | null } };

export const MAX_HINT_LEVEL = 3;

const mockAdapter: AxiosAdapter = (config) => import('./mock').then(({ handle }) => handle(config));

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL?.trim() || '/api',
	timeout: 180000,
	adapter: MOCK_ACCOUNT ? mockAdapter : undefined,
});

type TokenGetter = () => Promise<string | null>;

let getToken: TokenGetter | null = null;

export function setClerkToken(getter: TokenGetter | null) {
	getToken = getter;
}

api.interceptors.request.use(async (config) => {
	const token = await getToken?.();

	if (token) {
		config.headers.set('Authorization', `Bearer ${token}`);
	}

	return config;
});

const get = <T>(url: string, params?: object) => api.get<T>(url, { params }).then((res) => res.data);
const post = <T>(url: string, body?: object) => api.post<T>(url, body).then((res) => res.data);

export const getAccount = () => get<Account>('/me');
export const updateAccount = (body: AccountUpdate) => api.patch<Account>('/me', body).then((res) => res.data);

export const getDocuments = () => get<DocumentItem[]>('/documents');
export const getDocument = (id: string, historyId?: string) =>
	get<Exam>(`/documents/${encodeURIComponent(id)}`, historyId ? { history_id: historyId } : undefined);
export const getReview = () => get<Exam>('/review');
export const getKnowledgeGraph = () => get<KnowledgeGraph>('/knowledge_graph');

export const getQuest = () => get<Quest>('/quest');
export const getQuestTest = (id: string) => get<Exam>(`/quest/${encodeURIComponent(id)}`);
export const startPath = () => post<Quest>('/quest/start');
export const resetQuest = () => post<Quest>('/quest/reset');

export const submitExam = (body: SubmitExamBody) =>
	api.post<SubmitExamResponse>('/exams/submit', body, { timeout: 600000 }).then((response) => response.data);

export async function getProcessingSnapshot(signal?: AbortSignal): Promise<ProcessingSnapshot> {
	const config = { signal, timeout: 10000 };
	const [ingest, practice, grading] = await Promise.all([
		api.get<IngestState>('/ingest', config),
		api.get<PracticeStatus>('/practice/status', config),
		api.get<{ exam_id: string | null }>('/exams/grading-status', config),
	]);
	return { ingest: ingest.data, practice: practice.data, grading: grading.data };
}

export const setIngestMode = (manual: boolean, signal?: AbortSignal) =>
	api.post<IngestState>('/ingest/mode', null, { params: { manual }, signal }).then((response) => response.data);
export const approveIngestSource = (url: string, signal?: AbortSignal) =>
	api.post<IngestState>('/ingest/approve', null, { params: { url }, signal }).then((response) => response.data);
export const rejectIngestSource = (url: string, signal?: AbortSignal) =>
	api.delete<IngestState>('/ingest', { params: { url }, signal }).then((response) => response.data);
export const requestPractice = (request: string, signal?: AbortSignal) =>
	api.post<DocumentItem[]>('/practice/update', { request }, { signal }).then((response) => response.data);
export const createHistory = (exam_id: string, mode: HistoryMode) =>
	post<{ history_id: string }>('/history', { exam_id, mode });
export const checkQuestion = (history_id: string, question_id: string, student_answer: AnswerPayload) =>
	post<Evaluation>('/practice/check-question', { history_id, question_id, student_answer });

export const getHistoryList = () => get<HistoryItem[]>('/history');
export const getHistory = (id: string) => get<HistoryDetail>(`/history/${encodeURIComponent(id)}`);

export const askHint = (question_id: string, level: number, student_answer: AnswerPayload | undefined, onChunk: (text: string) => void) =>
	stream('/hints', { question_id, level, student_answer }, onChunk);
export const askSolution = (history_id: string, question_id: string, onChunk: (text: string) => void) =>
	stream('/solutions', { history_id, question_id }, onChunk);

export type ChatMessage = { role: 'user' | 'assistant'; content: string };
type ChatBody = { message: string; history: ChatMessage[]; question_id: string; student_answer?: AnswerPayload };

export const streamChat = (body: ChatBody, onChunk: (text: string) => void, onModel: (model: string) => void) =>
	stream('/teacher/chat', body, onChunk, onModel);

async function stream(path: string, body: object, onChunk: (text: string) => void, onModel?: (model: string) => void) {
	if (MOCK_ACCOUNT) {
		const reply = await post<{ model: string; content: string }>(path, body);
		onModel?.(reply.model);
		return onChunk(reply.content);
	}

	const token = await getToken?.();
	const response = await fetch(`${api.defaults.baseURL}${path}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
		body: JSON.stringify(body),
	});
	if (!response.ok || !response.body) throw new Error((await response.json().catch(() => null))?.detail ?? 'Trợ lý chưa trả lời được.');

	const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
	let buffer = '';
	for (let chunk = await reader.read(); !chunk.done; chunk = await reader.read()) {
		const events = (buffer + chunk.value).split('\n\n');
		buffer = events.pop() ?? '';
		for (const event of events) {
			const data = JSON.parse(event.replace(/^data: /, ''));
			if (data.type === 'error') throw new Error('Trợ lý chưa trả lời được.');
			if (data.type === 'model') onModel?.(data.content);
			else onChunk(data.content);
		}
	}
}
