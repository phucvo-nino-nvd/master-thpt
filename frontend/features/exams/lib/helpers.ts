import { AnswerPayload } from '@/shared/api/client';

export type AnswerValue = string | Array<boolean | null>;

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
