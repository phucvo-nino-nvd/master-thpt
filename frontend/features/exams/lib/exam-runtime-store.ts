import { DocumentDetailResponse } from '@/shared/api/client';

const examDetailCache = new Map<string, DocumentDetailResponse>();

function cloneValue<T>(value: T): T {
	if (typeof structuredClone === 'function') {
		return structuredClone(value);
	}

	return JSON.parse(JSON.stringify(value)) as T;
}

export function cacheExamDetail(exam: DocumentDetailResponse) {
	examDetailCache.set(exam.exam_id, cloneValue(exam));
}

export function getCachedExamDetail(examId: string): DocumentDetailResponse | null {
	const value = examDetailCache.get(examId);

	return value ? cloneValue(value) : null;
}

export function clearCachedExamDetail(examId: string) {
	examDetailCache.delete(examId);
}
