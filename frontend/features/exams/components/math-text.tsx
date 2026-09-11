import Latex from 'react-latex-next';

import { normalizeMath } from '@/features/exams/components/math-normalize';

// All math-capable text goes through one component so we can swap rendering strategy later
// without updating every screen individually.
const IMAGE_RE = /^!\[([\s\S]*)\]\(([^)]+)\)$/;
const CELL_RE = /<(td|th)([^>]*)>([\s\S]*?)<\/\1>/g;
const BOLD_RE = /\*\*([\s\S]+?)\*\*/g;

type Cell = { tag: 'td' | 'th'; text: string; rowSpan?: number; colSpan?: number };
type Block = { table: Cell[][] } | { image: { src: string; alt: string } } | { text: string[] };

function span(attrs: string, name: string) {
	const match = attrs.match(new RegExp(`${name}="(\\d+)"`));
	return match ? Number(match[1]) : undefined;
}

function parseRow(line: string): Cell[] {
	return Array.from(line.matchAll(CELL_RE)).map(([, tag, attrs, text]) => ({
		tag: tag as 'td' | 'th',
		text,
		rowSpan: span(attrs, 'rowspan'),
		colSpan: span(attrs, 'colspan'),
	}));
}

function Rich({ text }: { text: string }) {
	return (
		<>
			{normalizeMath(text).split(BOLD_RE).map((part, index) =>
				!part ? null : index % 2 ? (
					<strong key={index}>
						<Latex>{part}</Latex>
					</strong>
				) : (
					<Latex key={index}>{part}</Latex>
				),
			)}
		</>
	);
}

export function MathText({ text }: { text: string }) {
	const blocks: Block[] = [];

	for (const line of text.split('\n')) {
		const trimmed = line.trim();
		const last = blocks[blocks.length - 1];
		const image = trimmed.match(IMAGE_RE);

		if (image) {
			blocks.push({ image: { alt: image[1], src: image[2] } });
			continue;
		}

		if (trimmed.startsWith('<table')) {
			blocks.push({ table: [] });
			continue;
		}

		if (trimmed.startsWith('<tr') && last && 'table' in last) {
			last.table.push(parseRow(trimmed));
			continue;
		}

		if (trimmed.startsWith('</table')) {
			continue;
		}

		if (last && 'text' in last) {
			last.text.push(line);
		} else {
			blocks.push({ text: [line] });
		}
	}

	return (
		<span className="exam-math-text">
			{blocks.map((block, index) => {
				if ('image' in block) {
					return (
						<span key={index} className="exam-image-inline">
							<img src={block.image.src} alt={block.image.alt} />
						</span>
					);
				}

				if ('table' in block) {
					return (
						<table key={index} className="exam-table">
							<tbody>
								{block.table.map((row, rowIndex) => (
									<tr key={rowIndex}>
										{row.map((cell, cellIndex) =>
											cell.tag === 'th' ? (
												<th key={cellIndex} rowSpan={cell.rowSpan} colSpan={cell.colSpan}>
													<Rich text={cell.text} />
												</th>
											) : (
												<td key={cellIndex} rowSpan={cell.rowSpan} colSpan={cell.colSpan}>
													<Rich text={cell.text} />
												</td>
											),
										)}
									</tr>
								))}
							</tbody>
						</table>
					);
				}

				return <Rich key={index} text={block.text.join('\n')} />;
			})}
		</span>
	);
}
