const SYMBOLS = '∫∑∏√∮∂∇≤≥≠≈≡±∓∞∈∉⊂⊃∪∩→←↔⇒⇔αβγδθλμπσφω';

const DOLLAR = /\$\$[\s\S]*?\$\$|\$[^$]*\$/g;
const STRONG = new RegExp(`[\\\\^_{}\\[\\]${SYMBOLS}]`);
const ALLOWED = /^[-+/=<>0-9().,;:a-zA-Z]+$/;
const OPERATOR = /[-+/=<>0-9()]/;
const TRAILING = /[.,;:]+$/;

const REPAIRS: [RegExp, string][] = [
	[/\\\\(?=[a-zA-Z,;:!])/g, '\\'],
	[/\$\\\(([\s\S]*?)\$\)/g, '$$$1$$'],
	[/\\\[([\s\S]+?)\\\]/g, '$$$$$1$$$$'],
	[/\\\(([\s\S]+?)\\\)/g, '$$$1$$'],
	[/\\\[([^\n]*)\]/g, '$$$$$1$$$$'],
	[/\\\(([^\n]*)\)/g, '$$$1$$'],
];

function joins(token: string): boolean {
	const core = token.replace(TRAILING, '');

	return (
		STRONG.test(core) ||
		(ALLOWED.test(core) && (OPERATOR.test(core) || core.length <= 2))
	);
}

function wrapBare(chunk: string): string {
	const parts = chunk.split(/([ \t]+)/);
	const out: string[] = [];
	let run: string[] = [];

	const flush = () => {
		const joined = run.join('');
		const tail = joined.match(TRAILING)?.[0] ?? '';

		out.push(
			run.some((part) => STRONG.test(part))
				? `$${joined.slice(0, joined.length - tail.length)}$${tail}`
				: joined,
		);
		run = [];
	};

	for (const part of parts) {
		if (run.length && /^[ \t]+$/.test(part)) {
			run.push(part);
			continue;
		}

		if (joins(part)) {
			run.push(part);
			continue;
		}

		if (run.length) {
			if (/^[ \t]+$/.test(run[run.length - 1])) {
				const separator = run.pop() as string;
				flush();
				out.push(separator);
			} else {
				flush();
			}
		}

		out.push(part);
	}

	if (run.length) {
		flush();
	}

	return out.join('');
}

export function normalizeMath(text: string): string {
	const repaired = REPAIRS.reduce(
		(current, [pattern, replacement]) => current.replace(pattern, replacement),
		text,
	);

	const out: string[] = [];
	let last = 0;

	for (const match of repaired.matchAll(DOLLAR)) {
		out.push(wrapBare(repaired.slice(last, match.index)), match[0]);
		last = match.index + match[0].length;
	}

	out.push(wrapBare(repaired.slice(last)));

	return out.join('');
}
