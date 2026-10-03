import type { IngestState, ProcessingSnapshot } from '../shared/api/client';

export function sourceHref(value: string) {
	try {
		const url = new URL(value);
		return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
	} catch {
		return null;
	}
}

export function pendingSources(ingest: IngestState) {
	return [...new Map(ingest.batches.flatMap((batch) => batch.docs).map((source) => [source.url, source])).values()];
}

export function processingPhase(snapshot: ProcessingSnapshot | null, submitting: boolean) {
	if (submitting || snapshot?.grading.exam_id) return 'grading';
	const stage = snapshot?.practice.stage;
	if (stage === 'parser_agent') return 'parsing';
	if (stage === 'author_agent') return 'authoring';
	if (stage === 'item_bank') return 'indexing';
	if (stage) return 'finding';
	if (snapshot?.ingest.batches.some((batch) => batch.docs.length)) return 'approval';
	return 'idle';
}
