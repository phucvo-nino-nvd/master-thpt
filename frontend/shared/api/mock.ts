import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { XP_PER_CORRECT, dayKey } from '@/lib/format';
import { ACCOUNT } from './account';
import type {
	AccountUpdate,
	AnswerPayload,
	Evaluation,
	Exam,
	ExamQuestion,
	HistoryDetail,
	HistoryMode,
	IngestState,
	PracticeStatus,
	QuestStation,
	SubmitExamBody,
} from './client';

const PASS_RATIO = 0.6;
const TEST_SIZE = 5;
const OBSTACLE_SIZE = 4;
const XP_PER_CUP = 10;
const XP_PER_EXAM = 20;

const db = structuredClone(ACCOUNT);

const ingest: IngestState = {
	manual: true,
	batches: [{ request: { concept: 'Tích phân', grade: 12 }, docs: [
		{ title: 'Đề chính thức tốt nghiệp THPT 2026 · Toán', url: 'https://toanmath.com/toanmath-pdf/de-chinh-thuc-ky-thi-tot-nghiep-thpt-nam-2026-mon-toan.pdf', score: 1 },
		{ title: 'Thi thử THPT Phan Chu Trinh 2024 · Toán', url: 'https://toanmath.com/toanmath-pdf/de-thi-thu-tot-nghiep-thpt-2024-mon-toan-truong-thpt-phan-chu-trinh-dak-lak.pdf', score: 0.9 },
	] }],
};
let processingStarted = 0;
const practiceStatus = (): PracticeStatus => {
	const elapsed = Date.now() - processingStarted;
	return elapsed < 4000
		? { concept: 'Tích phân', stage: elapsed < 2000 ? 'parser_agent' : 'item_bank', step: 1, total: 1 }
		: { concept: null, stage: null, step: 0, total: 0 };
};

const today = () => dayKey(new Date());

class MockError extends Error {
	constructor(readonly status: number, message: string) {
		super(message);
	}
}

const questItems = (): QuestStation[] => db.quest.stages.flatMap((stage) => [...stage.stations, stage]);

const questItem = (id: string) => questItems().find((item) => item.id === id);

function examOf(id: string, title: string, ids: string[], duration = 0): Exam {
	const questions = ids
		.map((qid) => db.questions.find((question) => question.id === qid))
		.filter((question): question is ExamQuestion => !!question);

	return { exam_id: id, title, subject: 'Toán', grade: db.account.grade ?? 12, total_questions: questions.length, duration_minutes: duration, questions };
}

function rotated(offset: number, size: number) {
	const ids = db.questions.map((question) => question.id);
	return Array.from({ length: Math.min(size, ids.length) }, (_, i) => ids[(offset + i) % ids.length]);
}

const TRUE_FALSE_POINTS = [0, 0.1, 0.25, 0.5, 1];

function maximumScore(question: ExamQuestion): number {
	if (question.type === 'true_false') return TRUE_FALSE_POINTS[Math.min(question.parts.length, 4)];
	return question.type === 'short_answer' ? 0.5 : 0.25;
}

function scoreOf(questions: HistoryDetail['questions']): number {
	const earned = questions.reduce((sum, question) => sum + question.evaluation.score, 0);
	const maximum = questions.reduce((sum, entry) => {
		const question = db.questions.find((question) => question.id === entry.question_id);
		if (!question) throw new MockError(404, 'Không tìm thấy câu hỏi.');
		return sum + maximumScore(question);
	}, 0);
	return maximum ? Math.round((1000 * earned) / maximum) / 100 : 0;
}

function grade(question: ExamQuestion, answer: AnswerPayload): Evaluation {
	if (Array.isArray(question.answer)) {
		const given = Array.isArray(answer) ? answer : [];
		const part_correct = question.answer.map((value, i) => given[i] === value);
		const right = part_correct.filter(Boolean).length;
		const correct = right === part_correct.length;

		return { score: TRUE_FALSE_POINTS[Math.min(right, 4)], correct, part_correct, feedback: correct ? 'Đúng hết các ý.' : `Đúng ${right}/${part_correct.length} ý.` };
	}

	const correct = String(answer).trim().toUpperCase() === question.answer.toUpperCase();

	return { score: correct ? maximumScore(question) : 0, correct, part_correct: [], feedback: correct ? 'Chính xác!' : `Chưa đúng. Đáp án là ${question.answer}.` };
}

function reward(answered: number, correct: number) {
	const account = db.account;
	const xp = correct * XP_PER_CORRECT;
	const day = account.activity.find((entry) => entry.date === today());

	account.xp += xp;
	account.daily = account.daily.map((task) => ({ ...task, current: Math.min(task.target, task.current + correct) }));

	if (day) day.count += answered;
	else account.activity.push({ date: today(), count: answered });

	if (!account.kept_today) {
		account.kept_today = true;
		account.streak += 1;
		account.week[(new Date().getDay() + 6) % 7] = true;
	}
}

function advanceQuest() {
	let current: string | null = null;

	for (const item of questItems()) {
		if (item.status === 'passed') continue;

		if (current) {
			item.status = 'locked';
		} else {
			current = item.id;
			if (item.status !== 'blocked') item.status = 'current';
		}
	}

	db.quest.current = current;
}

function progressQuest(examId: string, passed: boolean) {
	const obstacle = db.quest.obstacle;

	if (obstacle && examId === obstacle.id) {
		if (!passed) {
			obstacle.depth += 1;
			return;
		}

		db.quest.obstacle = null;
		const item = questItem(examId.replace('obstacle:', ''));
		if (item) item.status = 'current';
		return;
	}

	const item = questItem(examId);
	if (!item || item.status === 'passed') return;

	item.status = passed ? 'passed' : 'blocked';
	if (passed && db.quest.stages.some((stage) => stage.id === examId)) db.account.xp += XP_PER_CUP;
	db.quest.obstacle = passed ? null : { id: `obstacle:${item.id}`, depth: 1, knowledge_ids: [], total_questions: OBSTACLE_SIZE };
	advanceQuest();
}

function record(exam_id: string, mode: HistoryMode, questions: HistoryDetail['questions'], duration_seconds: number | null): HistoryDetail {
	const detail: HistoryDetail = {
		history_id: `h-${Date.now()}`,
		exam_id,
		mode,
		total_score: scoreOf(questions),
		correct_count: questions.filter((question) => question.evaluation.correct).length,
		total_questions: questions.length,
		duration_seconds,
		created_at: new Date().toISOString(),
		questions,
	};

	db.history.unshift(detail);
	return detail;
}

function questTest(id: string): Exam {
	const obstacle = db.quest.obstacle;

	if (obstacle && id === obstacle.id) {
		return examOf(id, `Chướng ngại: ${questItem(id.replace('obstacle:', ''))?.name ?? ''}`, db.review.slice(0, OBSTACLE_SIZE));
	}

	const index = questItems().findIndex((item) => item.id === id);
	const item = questItems()[index];

	if (!item || item.status === 'locked') throw new MockError(403, 'Trạm này chưa mở.');

	return examOf(id, item.name, rotated(index, TEST_SIZE));
}

function submit(body: SubmitExamBody) {
	const questions = body.answers.map(({ question_id, student_answer }) => {
		const question = db.questions.find((entry) => entry.id === question_id);
		if (!question) throw new MockError(404, 'Không tìm thấy câu hỏi.');
		return { question_id, student_answer, evaluation: grade(question, student_answer) };
	});
	const mode = body.mode ?? 'exam';
	const detail = record(body.exam_id, mode, questions, body.duration_seconds ?? null);

	reward(questions.length, detail.correct_count);
	if (mode === 'exam' && questions.every(({ student_answer }) => String(student_answer).trim())) db.account.xp += XP_PER_EXAM;

	if (mode === 'checkpoint' || mode === 'obstacle') {
		progressQuest(body.exam_id, detail.correct_count / Math.max(1, detail.total_questions) >= PASS_RATIO);
	}

	const document = db.documents.find((entry) => entry.id === body.exam_id);
	if (document) document.is_completed = true;

	return {
		exam_id: body.exam_id,
		history_id: detail.history_id,
		total_score: detail.total_score,
		correct_count: detail.correct_count,
		per_question: Object.fromEntries(questions.map((question) => [question.question_id, question.evaluation])),
	};
}

function check(body: { history_id: string; question_id: string; student_answer: AnswerPayload }) {
	const detail = db.history.find((entry) => entry.history_id === body.history_id);
	const question = db.questions.find((entry) => entry.id === body.question_id);
	if (!detail || !question) throw new MockError(404, 'Không tìm thấy lượt làm bài.');

	const evaluation = grade(question, body.student_answer);
	detail.questions = [...detail.questions.filter((entry) => entry.question_id !== body.question_id), { ...body, evaluation }];
	detail.total_questions = detail.questions.length;
	detail.correct_count = detail.questions.filter((entry) => entry.evaluation.correct).length;
	detail.total_score = scoreOf(detail.questions);
	reward(1, evaluation.correct ? 1 : 0);

	return evaluation;
}

function updateAccount(body: AccountUpdate) {
	db.account = { ...db.account, ...body, settings: { ...db.account.settings, ...body.settings } };
	return db.account;
}

function route(method: string, path: string[], params: Record<string, string>, body: any): unknown {
	const [resource, id] = path;

	switch (`${method} ${resource}${id ? '/:id' : ''}`) {
		case 'get ingest':
			return ingest;
		case 'post ingest/:id':
			if (id === 'mode') ingest.manual = String(params.manual) === 'true';
			else if (id === 'approve') {
				if (practiceStatus().stage) throw new MockError(409, 'Đang xử lý một nguồn khác.');
				if (ingest.batches.some((batch) => batch.docs.some((doc) => doc.url === params.url))) processingStarted = Date.now();
				for (const batch of ingest.batches) batch.docs = batch.docs.filter((doc) => doc.url !== params.url);
			}
			return ingest;
		case 'delete ingest':
			for (const batch of ingest.batches) batch.docs = batch.docs.filter((doc) => doc.url !== params.url);
			return ingest;
		case 'post practice/update':
			processingStarted = Date.now();
			return [];
		case 'get practice/status':
			return practiceStatus();
		case 'get exams/grading-status':
			return { exam_id: null };
		case 'get me':
			return db.account;
		case 'patch me':
			return updateAccount(body);
		case 'get documents':
			return db.documents;
		case 'get documents/:id': {
			const document = db.documents.find((entry) => entry.id === id);
			if (document) return examOf(id, document.title, db.papers[id] ?? [], document.duration);
			const reviewed = db.history.find((entry) => entry.history_id === params.history_id);
			if (!reviewed) throw new MockError(404, 'Không tìm thấy đề thi.');
			return examOf(id, questItem(id)?.name ?? 'Luyện tập', reviewed.questions.map((entry) => entry.question_id));
		}
		case 'get review':
			return examOf(`review:${today()}`, 'Nhiệm vụ hôm nay', db.review);
		case 'get knowledge_graph':
			return { nodes: db.knowledge, edges: [], streak: db.account.streak };
		case 'get quest':
			return db.quest;
		case 'get quest/:id':
			return questTest(id);
		case 'post quest/:id':
			if (id === 'start') {
				for (const item of questItems()) item.status = 'locked';
				db.quest.obstacle = null;
				advanceQuest();
			}
			return db.quest;
		case 'post exams/submit':
			return submit(body);
		case 'post history':
			return { history_id: record(body.exam_id, body.mode, [], null).history_id };
		case 'post practice/check-question':
			return check(body);
		case 'get history':
			return db.history.map(({ questions, ...item }) => item);
		case 'get history/:id': {
			const detail = db.history.find((entry) => entry.history_id === id);
			if (!detail) throw new MockError(404, 'Không tìm thấy lượt làm bài.');
			return detail;
		}
		case 'post hints':
			return { model: 'mock', content: db.hints[body.question_id]?.[body.level - 1] ?? 'Xác định dạng toán rồi viết công thức tương ứng ra trước nha.' };
		case 'post teacher/chat':
			return { model: 'mock', content: `Câu "${body.message}" hay đó! Thử viết lại đề bài thành công thức trước, rồi đối chiếu từng bước với lời giải nha.` };
		case 'post solutions':
			return { model: 'mock', content: db.solutions[body.question_id] ?? 'Lời giải chi tiết sẽ có khi nối backend.' };
		default:
			throw new MockError(404, `Mock chưa có ${method.toUpperCase()} /${path.join('/')}`);
	}
}

export async function handle(config: InternalAxiosRequestConfig): Promise<AxiosResponse> {
	const path = (config.url ?? '').split('?')[0].split('/').filter(Boolean).map(decodeURIComponent);
	const [resource, id] = path;
	const key = ['practice', 'exams', 'teacher'].includes(resource) ? [`${resource}/${id}`] : path;
	const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;

	try {
		const data = structuredClone(route(config.method ?? 'get', key, config.params ?? {}, body));
		return { data, status: 200, statusText: 'OK', headers: {}, config };
	} catch (error) {
		if (!(error instanceof MockError)) throw error;
		const response = { data: { detail: error.message }, status: error.status, statusText: '', headers: {}, config };
		throw new AxiosError(error.message, String(error.status), config, null, response);
	}
}
