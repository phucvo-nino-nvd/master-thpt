'use client';

import { ReactNode, useEffect, useState } from 'react';
import s from './camel-loading.module.css';

const LOAD_START_MS = 60;

export function CamelArt() {
	return (
		<picture className={s.art}>
			<source media="(prefers-reduced-motion: reduce)" srcSet="/illustrations/roadmap-camel-still.jpg" />
			<img src="/illustrations/roadmap-camel.gif" alt="" width={800} height={600} />
		</picture>
	);
}

export function CamelLoading({ title, children }: { title: string; children?: ReactNode }) {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const fill = setTimeout(() => setLoaded(true), LOAD_START_MS);
		return () => clearTimeout(fill);
	}, []);

	return (
		<div className={s.screen} role="status">
			<CamelArt />
			<div className={s.title}>{title}</div>
			<div className={s.track}>
				<span style={{ width: loaded ? '100%' : '0%' }} />
			</div>
			{children}
		</div>
	);
}
