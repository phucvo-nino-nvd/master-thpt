import assert from 'node:assert/strict';
import test from 'node:test';
import { pendingSources, processingPhase, sourceHref } from './processing.ts';

test('deduplicates source URLs and rejects unsafe links', () => {
	const source = { url: 'https://example.org/a.pdf', title: 'Đề A', score: 1 };
	assert.equal(pendingSources({ manual: true, batches: [
		{ request: { concept: 'A', grade: 12 }, docs: [source] },
		{ request: { concept: 'B', grade: 12 }, docs: [source] },
	] }).length, 1);
	assert.equal(sourceHref(source.url), source.url);
	for (const value of ['javascript:alert(1)', 'data:text/html,test', 'file:///etc/passwd', 'not a URL']) assert.equal(sourceHref(value), null);
});

test('uses real backend stages and does not treat idle as success', () => {
	const snapshot = { ingest: { manual: true, batches: [] }, grading: { exam_id: null }, practice: { concept: null, stage: null as string | null, step: 0, total: 0 } };
	assert.equal(processingPhase(null, false), 'idle');
	assert.equal(processingPhase(snapshot, true), 'grading');
	for (const [stage, phase] of [['planning', 'finding'], ['crawler_agent', 'finding'], ['parser_agent', 'parsing'], ['author_agent', 'authoring'], ['item_bank', 'indexing'], [null, 'idle']]) {
		snapshot.practice.stage = stage;
		assert.equal(processingPhase(snapshot, false), phase);
	}
});
