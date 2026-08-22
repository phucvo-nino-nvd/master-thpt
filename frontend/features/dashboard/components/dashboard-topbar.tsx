'use client';

import { PracticeSteps } from '@/features/practice/components/practice-steps';
import { PracticeStatus, getIngest, getPracticeStatus } from '@/shared/api/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const STATUS_DELAY = 2000;
const DONE_DELAY = 5000;

export function DashboardTopbar({
	onStatus,
}: {
	onStatus?: (status: PracticeStatus | null) => void;
}) {
	const pathname = usePathname();
	const [status, setStatus] = useState<PracticeStatus | null>(null);
	const [pending, setPending] = useState(0);

	useEffect(() => {
		async function pollStatus() {
			try {
				const [data, ingest] = await Promise.all([getPracticeStatus(), getIngest()]);
				const running = data.concept === null ? null : data;

				setStatus((previous) =>
					running ?? (previous && previous.stage !== 'done' ? { ...previous, stage: 'done' } : previous),
				);
				setPending(ingest.batches.reduce((total, batch) => total + batch.docs.length, 0));
				onStatus?.(running);
			} catch {
				setStatus(null);
				onStatus?.(null);
			}
		}

		void pollStatus();

		const statusTimer = window.setInterval(pollStatus, STATUS_DELAY);

		return () => {
			window.clearInterval(statusTimer);
		};
	}, [onStatus]);

	useEffect(() => {
		if (status?.stage !== 'done') {
			return;
		}

		const doneTimer = window.setTimeout(() => setStatus(null), DONE_DELAY);

		return () => {
			window.clearTimeout(doneTimer);
		};
	}, [status?.stage]);

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
		<>
			<header className="dash-topbar">
				<Link
					href="https://masterthpt.app/"
					className="dash-brand"
					target="_blank"
					rel="noreferrer"
					aria-label="Mở website masterthpt.app"
				>
					<svg viewBox="0 0 32 32" aria-hidden="true" className="dash-dot">
						<circle cx="16" cy="16" r="11" fill="none" stroke="#39424f" strokeWidth="5" />
						<circle
							cx="16"
							cy="16"
							r="11"
							fill="none"
							stroke="#d98e34"
							strokeWidth="5"
							strokeLinecap="round"
							strokeDasharray="52 70"
							transform="rotate(-90 16 16)"
						/>
					</svg>
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

			{status ? (
				<PracticeSteps status={status} />
			) : pending && pathname !== '/documents' ? (
				<div className="practice-steps" role="status" aria-live="polite">
					<p className="practice-steps-caption">
						{pending} đường dẫn đề mới đang chờ duyệt.{' '}
						<Link href="/documents">Duyệt để lấy thêm câu</Link>
					</p>
				</div>
			) : null}
		</>
	);
}
