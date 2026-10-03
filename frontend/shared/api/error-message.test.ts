import assert from 'node:assert/strict';
import test from 'node:test';
import { AxiosError } from 'axios';
import { getApiErrorMessage } from './error-message.ts';

test('reads API messages and safely falls back for malformed responses', () => {
	const fallback = 'Không tải được dữ liệu.';
	for (const [data, expected] of [
		[{ message: 'Lỗi', detail: 'Chi tiết' }, 'Lỗi'],
		[{ detail: 'Chi tiết' }, 'Chi tiết'],
		[{ message: ['Lỗi đầu', 'Lỗi sau'] }, 'Lỗi đầu'],
		[{ detail: ['Chi tiết'] }, 'Chi tiết'],
		[{ detail: [{ msg: 'Invalid input' }] }, fallback],
		[{ message: [] }, fallback],
		[{ message: '  ' }, fallback],
		[{ message: 400 }, fallback],
		[null, fallback],
	] as const) {
		assert.equal(getApiErrorMessage({ response: { data } }, fallback), expected);
	}
	assert.equal(getApiErrorMessage(new Error('Thử lại'), fallback), 'Thử lại');
	assert.equal(getApiErrorMessage(new AxiosError('Network Error'), fallback), fallback);
	for (const value of [null, undefined, 400, 'error', {}, new Error(' ')]) {
		assert.equal(getApiErrorMessage(value, fallback), fallback);
	}
});
