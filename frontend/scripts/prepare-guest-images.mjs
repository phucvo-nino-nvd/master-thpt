import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const guestDir = fileURLToPath(new URL('../public/guest/', import.meta.url));
const sourceDir = path.resolve(fileURLToPath(new URL('../../artifacts/data/', import.meta.url)));
const prefix = '/api/images/';

for (const name of await readdir(guestDir)) {
	if (!name.endsWith('.json')) continue;
	const examPath = path.join(guestDir, name);
	const exam = JSON.parse(await readFile(examPath, 'utf8'));
	const replacements = new Map();

	for (const question of exam.questions) {
		for (const image of question.images ?? []) {
			if (!image.url.startsWith(prefix) || replacements.has(image.url)) continue;
			const relative = decodeURIComponent(image.url.slice(prefix.length));
			const source = path.resolve(sourceDir, relative);
			if (!source.startsWith(sourceDir + path.sep)) {
				throw new Error(`Image path escapes the source directory: ${image.url}`);
			}
			const hash = createHash('sha256').update(relative).digest('hex').slice(0, 20);
			const filename = hash + path.extname(source);
			await mkdir(path.join(guestDir, 'images'), { recursive: true });
			await copyFile(source, path.join(guestDir, 'images', filename));
			replacements.set(image.url, `/guest/images/${filename}`);
		}
	}

	if (!replacements.size) continue;
	const bundled = JSON.stringify(exam, (_key, value) => {
		if (typeof value !== 'string') return value;
		for (const [original, local] of replacements) value = value.replaceAll(original, local);
		return value;
	});
	await writeFile(examPath, bundled + '\n');
	console.log(`${name}: bundled ${replacements.size} images`);
}
