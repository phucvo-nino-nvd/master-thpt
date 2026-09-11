import assert from 'node:assert/strict';
import test from 'node:test';

import { normalizeMath } from './math-normalize.ts';

test('closes a \\( the model forgot to escape', () => {
	assert.equal(
		normalizeMath('Tích phân \\(\\int_0^2 (f(x)-1)dx = 4 - 2 = 2), đáp án D.'),
		'Tích phân $\\int_0^2 (f(x)-1)dx = 4 - 2 = 2$, đáp án D.',
	);
});

test('keeps a well formed \\( \\) pair', () => {
	assert.equal(normalizeMath('Ta có \\(x^2\\) nhé.'), 'Ta có $x^2$ nhé.');
});

test('wraps bare latex that has no delimiter at all', () => {
	assert.equal(
		normalizeMath('bằng ∫ _a^b f(t) dt theo định nghĩa.'),
		'bằng $∫ _a^b f(t) dt$ theo định nghĩa.',
	);
});

test('leaves prose and plain numbers alone', () => {
	const prose = 'Em đã tính sai, đáp án đúng là B.';

	assert.equal(normalizeMath(prose), prose);
	assert.equal(normalizeMath('Kết quả 2 - 3 = -1 nhé.'), 'Kết quả 2 - 3 = -1 nhé.');
});

test('never touches text already inside $...$', () => {
	const done = 'Ta có $\\int_0^2 f(x)dx = 4$ và $g(1) = 2$.';

	assert.equal(normalizeMath(done), done);
});

test('collapses a double-escaped command but keeps a real row break', () => {
	assert.equal(
		normalizeMath('$F(t) = \\\\int f(t) \\\\, dt = 1$'),
		'$F(t) = \\int f(t) \\, dt = 1$',
	);
	assert.equal(
		normalizeMath('$\\begin{array}{c} 1 \\\\ 2 \\end{array}$'),
		'$\\begin{array}{c} 1 \\\\ 2 \\end{array}$',
	);
});

test('repairs a $ and \\( mixed together', () => {
	assert.equal(
		normalizeMath('Tích phân $\\(\\int_0^2 f(x)dx = 2$), đáp án D.'),
		'Tích phân $\\int_0^2 f(x)dx = 2$, đáp án D.',
	);
});

test('display math survives', () => {
	assert.equal(normalizeMath('\\[x^2 + 1\\]'), '$$x^2 + 1$$');
});
