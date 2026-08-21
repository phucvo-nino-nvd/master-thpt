'use client';

import { DashboardTopbar } from '@/features/dashboard/components/dashboard-topbar';

export default function DashboardPage() {
	return (
		<main className="dashboard-shell">
			<DashboardTopbar />

			<header className="documents-head">
				<h1 className="documents-title">Ôn tập &amp; thống kê</h1>
				<p className="text-soft">Tính năng đang được phát triển.</p>
			</header>
		</main>
	);
}
