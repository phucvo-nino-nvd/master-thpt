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

export function getAlphabetLabel(index: number) {
	return String.fromCharCode(65 + index);
}

export function formatAnswer(answer?: AnswerValue) {
	if (answer === undefined) {
		return '';
	}

	return Array.isArray(answer)
		? answer.map((value) => (value === null ? '-' : value ? 'Đúng' : 'Sai')).join(', ')
		: answer;
}

export function formatDuration(seconds: number | null) {
	if (seconds === null) {
		return '';
	}

	const minutes = Math.floor(seconds / 60);

	return minutes > 0 ? `${minutes} phút` : `${seconds} giây`;
}

export function formatDateTime(value: string) {
	const hasZone = /[zZ]$|[+-]\d{2}:?\d{2}$/.test(value);
	const date = new Date(hasZone ? value : `${value.replace(' ', 'T')}Z`);
	if (Number.isNaN(date.getTime())) {
		return value;
	}

	return new Intl.DateTimeFormat('vi-VN', {
		dateStyle: 'short',
		timeStyle: 'short',
	}).format(date);
}

export function formatScore(value: number) {
	return new Intl.NumberFormat('vi-VN', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(value);
}
