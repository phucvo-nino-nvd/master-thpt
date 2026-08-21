import { ExamQuestion, QuestionType } from '@/shared/api/client';

export type QuestionSectionType = QuestionType;

export type FlatQuestion = {
	question_id: string;
	index: number;
	sectionType: QuestionSectionType;
	question: ExamQuestion;
};

export function flattenExam(questions: ExamQuestion[]): FlatQuestion[] {
	// Number questions across the whole paper so the flat navigation grid has no duplicates.
	return questions.map((question, index) => ({
		question_id: question.id,
		index: index + 1,
		sectionType: question.type,
		question,
	}));
}
