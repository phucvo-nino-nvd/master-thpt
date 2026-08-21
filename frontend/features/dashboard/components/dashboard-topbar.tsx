'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DashboardTopbar() {
	const pathname = usePathname();
	const navItems = [
		{ href: '/knowledge_graph', label: '1 · Bản đồ tri thức' },
		{ href: '/documents', label: '2 · Kho đề gốc' },
		{ href: '/practice', label: '3 · Luyện tập' },
		{ href: '/history', label: '4 · Lịch sử làm bài' },
		{ href: '/review', label: '5 · Ôn tập & thống kê' },
	] as const;

	function isActiveLink(href: string) {
		return pathname === href || pathname.startsWith(`${href}/`);
	}

	return (
		<header className="dash-topbar">
			<Link
				href="https://masterthpt.app/"
				className="dash-brand"
				target="_blank"
				rel="noreferrer"
				aria-label="Mở website masterthpt.app"
			>
				<span className="dash-dot" />
				<strong>MASTER THPT</strong>
			</Link>

			<nav className="dash-nav" aria-label="Điều hướng chính">
				{navItems.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className={`dash-nav-link ${isActiveLink(item.href) ? 'is-active' : ''}`}
					>
						{item.label}
					</Link>
				))}
			</nav>
		</header>
	);
}
