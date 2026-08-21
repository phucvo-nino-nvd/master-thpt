export function getAlphabetLabel(index: number) {
	return String.fromCharCode(65 + index);
}

export function formatAnswer(answer: string | boolean[]) {
	return Array.isArray(answer)
		? answer.map((value) => (value ? 'Đúng' : 'Sai')).join(', ')
		: answer;
}

export function tokenToLabel(value: string) {
	return value === 'T' ? 'Đúng' : 'Sai';
}

export function formatDateTime(value: string) {
	const date = new Date(value);
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
