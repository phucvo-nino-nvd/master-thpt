import type { DocumentItem } from '@/shared/api/client';
import { docKind } from './format';

export function selectOfficialExam(documents: DocumentItem[]) {
	const official = documents.filter((document) => {
		if (docKind(document.title) !== 'official' || !/chính thức|kỳ thi tốt nghiệp THPT/i.test(document.title)) return false;

		try {
			const source = new URL(document.source);
			return source.protocol === 'https:' || source.protocol === 'http:';
		} catch {
			return false;
		}
	});

	return official.find((document) => !document.is_completed) ?? official[0];
}
