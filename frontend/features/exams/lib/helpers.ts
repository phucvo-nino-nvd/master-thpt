import { AnswerPayload, ExamQuestion } from '@/shared/api/client';

export type AnswerValue = string | Array<boolean | null>;

const canonical = (value: string) => value.replace(/\s+/g, '').replace(',', '.').toUpperCase();

export function isCorrect(question: ExamQuestion, answer: AnswerPayload) {
	if (Array.isArray(question.answer)) return Array.isArray(answer) && question.answer.every((value, i) => answer[i] === value);
	return !!question.answer && canonical(String(answer)) === canonical(question.answer);
}

export function toApiAnswer(value: AnswerValue): AnswerPayload {
	return Array.isArray(value) ? value.map((part) => part === true) : value;
}

export function isAnswered(value?: AnswerValue) {
	if (value === undefined) {
		return false;
	}

	return Array.isArray(value)
		? value.some((part) => part !== null)
		: value.split(',').some((token) => token.trim().length > 0);
}
