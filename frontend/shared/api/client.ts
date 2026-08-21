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

export type PracticeExamItem = {
	id: string;
	subject: string;
	source: string;
	total_questions: number;
	exam_type: string;
	grade: number;
	year: number;
};

export type UpdatePracticeBody = {
	request: string;
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

export type SubmitExamBody = {
	exam_id: string;
	time_taken_seconds: number;
	student_ans?: Array<{
		question_id: string;
		student_answer: string;
		time_spent_seconds?: number;
	}>;
	full_exam: Omit<DocumentDetailResponse, 'questions'> & {
		questions: Array<ExamQuestion & { student_answer: string }>;
	};
};

export type ExamEvaluationItem = {
	question_id: string;
	student_answer: string;
	correct_answer: string;
	is_correct: boolean;
	reasoning: string;
	error_analysis: null | {
		error_type: string;
		remedial: string;
	};
};

export type ExamEvaluationResponse = {
	correct_count: number;
	total_questions: number;
	score: number | null;
	per_question: ExamEvaluationItem[];
};

export type PracticeQuestionCheckBody = {
	exam_id: string;
	question_id: string;
	student_answer: string;
};

export type PracticeQuestionCheckResponse = {
	question_id: string;
	student_answer: string;
	correct_answer: string;
	is_correct: boolean;
};

export type CreateHistoryBody = {
	intent: 'EXAM_PRACTICE' | 'VIEW_ANALYSIS';
	exam_id: string;
	student_ans: Array<{
		question_id: string;
		student_answer: string;
		time_spent_seconds?: number;
	}>;
	correct_count: number;
	score?: number;
};

export type HistoryListItem = {
	history_id: string;
	intent: 'EXAM_PRACTICE' | 'VIEW_ANALYSIS';
	exam_id: string;
	correct_count: number;
	score?: number | null;
	created_at: string;
	subject: string;
	grade: number | null;
	exam_type: string;
	source: string;
	total_questions: number;
	duration: number;
	year: number | null;
};

export type HistoryDetailResponse = {
	history_id: string;
	intent: 'EXAM_PRACTICE' | 'VIEW_ANALYSIS';
	correct_count: number;
	score?: number | null;
	created_at: string;
	exam_id: string;
	subject: string;
	grade: number;
	exam_type: string;
	source: string;
	total_questions: number;
	duration_minutes: number;
	questions: ExamQuestion[];
	evaluation: ExamEvaluationResponse;
};

export type AskHintBody = {
	exam_id: string;
	question_id: string;
};

export type AskHintLevels = {
	hint_1: string;
	hint_2: string;
	hint_3: string;
};

export type AskHintResponse = {
	exam_id: string;
	question_id: string;
	feedback: string;
	hints: AskHintLevels;
};

export type ReviewMistakeBody = {
	question_id: string;
	student_ans: string;
};

export type ReviewMistakeResponse = {
	question_id: string;
	feedback: string;
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
	timeout: 60000,
});

export async function getDocuments() {
	const { data } = await api.get<DocumentItem[]>('/documents');
	return data;
}

export async function getKnowledgeGraph() {
	const { data } = await api.get<KnowledgeGraphResponse>('/knowledge_graph');
	return data;
}

export async function getPracticeExams() {
	const { data } = await api.get<PracticeExamItem[]>('/practice');

	return data;
}

export async function updatePractice(body: UpdatePracticeBody) {
	const { data } = await api.post('/practice/update', body);

	return data;
}

export async function getDocumentDetail(id: string) {
	const { data } = await api.get<DocumentDetailResponse>(`/documents/${id}`);
	return data;
}

export async function submitExam(body: SubmitExamBody) {
	const { data } = await api.post<ExamEvaluationResponse>('/exams/submit', body);

	return data;
}

export async function checkPracticeQuestion(body: PracticeQuestionCheckBody) {
	const { data } = await api.post<PracticeQuestionCheckResponse>('/practice/check-question', body);

	return data;
}

export async function createHistory(body: CreateHistoryBody) {
	const { data } = await api.post('/history', body);

	return data;
}

export async function getHistoryList() {
	const { data } = await api.get<HistoryListItem[]>('/history');

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

export async function reviewMistake(body: ReviewMistakeBody) {
	const { data } = await api.post<ReviewMistakeResponse>('/hints/review-mistake', body);

	return data;
}
