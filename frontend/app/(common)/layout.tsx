import { Sidebar } from '@/components/sidebar';
import { AuthorDock } from '@/components/processing-widget';
import s from '@/components/page.module.css';

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className={s.app}>
			<Sidebar />
			{children}
			<AuthorDock />
		</div>
	);
}
