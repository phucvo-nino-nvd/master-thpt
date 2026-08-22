import axios from 'axios';

export type DocumentItem = {
	id: string;
	title?: string;
	subject: string;
	grade: number;
	year?: number | null;
	exam_type?: string;
	type?: string;
	source?: string;
	total_questions?: number;
	duration?: number;
	is_completed?: boolean;
	created_at?: string;
};

export type UpdatePracticeBody = {
	request: string;
};

export type PracticeStatus = {
	concept: string | null;
	stage: string | null;
	step: number;
	total: number;
};

export type GradingStatus = {
	exam_id: string | null;
};

export type CrawledDoc = {
	url: string;
	title: string;
	score: number;
};

export type CrawlBatch = {
	request: { grade: number; concept: string };
	query: string;
	docs: CrawledDoc[];
	missing: number;
};

export type IngestState = {
	manual: boolean;
	batches: CrawlBatch[];
};

export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer';

export type QuestionOption = {
	label: string;
	content: string;
};

export type QuestionPart = {
	label: string;
	content: string;
	solution?: string;
};

export type QuestionImage = {
	url: string;
	alt?: string | null;
};

export type ExamQuestion = {
	id: string;
	section: string;
	number: number;
	type: QuestionType;
	content: string;
	options: QuestionOption[];
	parts: QuestionPart[];
	images: QuestionImage[];
	answer: string | boolean[];
};

export type DocumentDetailResponse = {
	exam_id: string;
	title: string;
	subject: string;
	grade: number;
	total_questions: number;
	duration_minutes: number;
	questions: ExamQuestion[];
};

export type AnswerPayload = string | boolean[];

export type Evaluation = {
	score: number;
	correct: boolean;
	part_correct: boolean[];
	feedback: string;
};

export type SubmitExamBody = {
	exam_id: string;
	answers: Array<{
		question_id: string;
		student_answer: AnswerPayload;
	}>;
	duration_seconds?: number;
};

export type SubmitExamResponse = {
	exam_id: string;
	history_id: string;
	total_score: number;
	correct_count: number;
	per_question: Record<string, Evaluation>;
};

export type PracticeQuestionCheckBody = {
	history_id: string;
	question_id: string;
	student_answer: AnswerPayload;
};

export type HistoryMode = 'exam' | 'practice';

export type CreateHistoryBody = {
	exam_id: string;
	mode?: HistoryMode;
	duration_seconds?: number;
};

export type HistoryCreated = {
	history_id: string;
};

export type HistoryItem = {
	history_id: string;
	exam_id: string;
	mode: HistoryMode;
	total_score: number;
	correct_count: number;
	total_questions: number;
	duration_seconds: number | null;
	created_at: string;
};

export type HistoryQuestion = {
	question_id: string;
	student_answer: AnswerPayload;
	evaluation: Evaluation;
};

export type HistoryDetailResponse = HistoryItem & {
	questions: HistoryQuestion[];
};

export const MAX_HINT_LEVEL = 3;

export type AskHintBody = {
	question_id: string;
	level: number;
	student_answer?: string | boolean[];
};

export type AskHintResponse = {
	hint: string;
	level: number;
};

export type AskSolutionBody = {
	history_id: string;
	question_id: string;
};

export type AskSolutionResponse = {
	solution: string;
};

export type KnowledgeStatus = 'weak' | 'learning' | 'mastered' | 'untouched';

export type KnowledgeGraphNode = {
	id: string;
	label: string;
	grade: number;
	status: KnowledgeStatus;
	score: number | null;
};

export type KnowledgeGraphEdge = {
	source: string;
	target: string;
	relation: 'REQUIRES' | 'IS_A' | 'PART_OF' | 'SUBSET_OF';
};

export type KnowledgeGraphResponse = {
	nodes: KnowledgeGraphNode[];
	edges: KnowledgeGraphEdge[];
};

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || '/api';

const api = axios.create({
	baseURL: apiBaseUrl,
	timeout: 180000,
});

export async function getDocuments() {
	const { data } = await api.get<DocumentItem[]>('/documents');
	return data;
}

export async function getKnowledgeGraph() {
	const { data } = await api.get<KnowledgeGraphResponse>('/knowledge_graph');
	return data;
}

export async function getPracticeExams(query = '') {
	const { data } = await api.get<DocumentItem[]>('/practice', { params: { q: query } });

	return data;
}

export async function getPracticeStatus() {
	const { data } = await api.get<PracticeStatus>('/practice/status');

	return data;
}

export async function getIngest() {
	const { data } = await api.get<IngestState>('/ingest');

	return data;
}

export async function setIngestMode(manual: boolean) {
	const { data } = await api.post<IngestState>('/ingest/mode', null, { params: { manual } });

	return data;
}

export async function dropIngestDoc(url: string) {
	const { data } = await api.delete<IngestState>('/ingest', { params: { url } });

	return data;
}

export async function approveIngest(url: string) {
	const { data } = await api.post<IngestState>('/ingest/approve', null, { params: { url } });

	return data;
}

export async function updatePractice(body: UpdatePracticeBody) {
	const { data } = await api.post<DocumentItem[]>('/practice/update', body);

	return data;
}

export async function getDocumentDetail(id: string, historyId?: string) {
	const { data } = await api.get<DocumentDetailResponse>(`/documents/${id}`, {
		params: historyId ? { history_id: historyId } : undefined,
	});

	return data;
}

export async function submitExam(body: SubmitExamBody) {
	const { data } = await api.post<SubmitExamResponse>('/exams/submit', body);

	return data;
}

export async function checkPracticeQuestion(body: PracticeQuestionCheckBody) {
	const { data } = await api.post<Evaluation>('/practice/check-question', body);

	return data;
}

export async function createHistory(body: CreateHistoryBody) {
	const { data } = await api.post<HistoryCreated>('/history', body);

	return data;
}

export async function getGradingStatus() {
	const { data } = await api.get<GradingStatus>('/exams/grading-status');

	return data;
}

export async function getHistoryList() {
	const { data } = await api.get<HistoryItem[]>('/history');

	return data;
}

export async function getHistoryDetail(id: string) {
	const { data } = await api.get<HistoryDetailResponse>(`/history/${id}`);

	return data;
}

export async function askHint(body: AskHintBody) {
	const { data } = await api.post<AskHintResponse>('/hints', body);

	return data;
}

export async function askSolution(body: AskSolutionBody) {
	const { data } = await api.post<AskSolutionResponse>('/solutions', body);

	return data;
}
