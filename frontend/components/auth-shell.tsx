import Link from 'next/link';
import { ReactNode } from 'react';
import { Rive } from './rive';
import s from './auth-shell.module.css';

export function AuthShell({ title, note, children }: { title: string; note: string; children: ReactNode }) {
	return (
		<div className={s.screen}>
			<div className={s.brandRow}>
				<Link href="/" className={s.brand}>
					<span className={s.mark}>M</span>MASTER THPT
				</Link>
				<span className={s.subject}>MÔN TOÁN · LỚP 12</span>
			</div>
			<div className={s.body}>
				<div className={s.side}>
					<div className={s.mascot}>
						<Rive src="mascot_hello" knockout fit="cover" fireonload trigger="clic salut|auth" bool="detect mouse=true" />
					</div>
					<h1 className={s.title}>{title}</h1>
					<p className={s.note}>{note}</p>
				</div>
				<div className={s.form}>{children}</div>
			</div>
		</div>
	);
}
