'use client';

import { DocumentsPageSkeleton } from '@/features/dashboard/components/loading-skeletons';
import { DashboardTopbar } from '@/features/dashboard/components/dashboard-topbar';
import {
	DocumentItem,
	IngestState,
	approveIngest,
	dropIngestDoc,
	getDocuments,
	getIngest,
	getPracticeStatus,
	setIngestMode,
} from '@/shared/api/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const INGEST_DELAY = 4000;

const INGEST_MODES = [
	{ manual: false, label: 'Tự động' },
	{ manual: true, label: 'Thủ công' },
];

const QUICK_FILTERS = [
	{ value: 'all', label: 'Tất cả' },
	{ value: 'Toán 12', label: 'Toán 12' },
	{ value: 'Toán 11', label: 'Toán 11' },
	{ value: 'Toán 10', label: 'Toán 10' },
	{ value: 'Đã làm', label: 'Đã làm' },
	{ value: 'Chưa làm', label: 'Chưa làm' },
];

// The item bank stores the original file path as `source`; only the file name is useful here.
function formatSource(source?: string) {
	if (!source) {
		return 'Nguồn chưa cập nhật';
	}

	const fileName = source.split('/').pop() ?? source;
	return fileName.replace(/\.(pdf|docx?|jpe?g|png)$/i, '');
}

function getDocumentTitle(item: DocumentItem) {
	return item.title?.trim() || [item.subject, item.exam_type].filter(Boolean).join(' - ');
}

function getDocumentKicker(item: DocumentItem) {
	return item.exam_type?.trim() || 'Đề gốc';
}

function formatDocumentPrimaryMetric(item: DocumentItem) {
	const parts: string[] = [];

	if (typeof item.total_questions === 'number') {
		parts.push(`${item.total_questions} câu`);
	}

	if (typeof item.duration === 'number') {
		parts.push(`${item.duration} phút`);
	}

	return parts.join(' • ') || 'Thông tin đề đang được cập nhật';
}

function formatDocumentSecondaryMeta(item: DocumentItem) {
	const parts = [formatSource(item.source)];

	if (typeof item.year === 'number') {
		parts.push(`Năm ${item.year}`);
	}

	return parts.join(' • ');
}

export default function DocumentsPage() {
	const router = useRouter();
	const [documents, setDocuments] = useState<DocumentItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [activeQuickFilter, setActiveQuickFilter] = useState<string>('all');
	const [ingest, setIngest] = useState<IngestState | null>(null);
	const [ingestError, setIngestError] = useState('');
	const [busy, setBusy] = useState(false);

	useEffect(() => {
		async function loadDocuments() {
			setError('');

			try {
				const data = await getDocuments();
				setDocuments(data);
			} catch {
				setError('Không thể tải kho đề. Vui lòng thử lại.');
			} finally {
				setLoading(false);
			}
		}

		loadDocuments();
	}, [router, busy]);

	// Manual mode queues crawled URLs on the server, so this page has to poll for them.
	useEffect(() => {
		async function pollIngest() {
			try {
				const [state, status] = await Promise.all([getIngest(), getPracticeStatus()]);
				setIngest(state);
				setBusy(status.concept !== null);
			} catch {
				setBusy(false);
			}
		}

		void pollIngest();

		const timer = window.setInterval(pollIngest, INGEST_DELAY);

		return () => {
			window.clearInterval(timer);
		};
	}, []);

	async function runIngestAction(action: () => Promise<IngestState>) {
		setIngestError('');

		try {
			setIngest(await action());
		} catch {
			setIngestError('Không thao tác được với hàng chờ. Vui lòng thử lại.');
		}
	}

	const queued = (ingest?.batches ?? []).flatMap((batch) =>
		batch.docs.map((doc) => ({ ...doc, concept: batch.request.concept })),
	);

	const filteredDocuments = useMemo(() => {
		return documents.filter((item) => {
			let matchedQuick = true;
			if (activeQuickFilter.startsWith('Toán ')) {
				matchedQuick =
					(item.subject?.includes('Toán') ?? false) &&
					String(item.grade) === activeQuickFilter.slice('Toán '.length);
			} else if (activeQuickFilter === 'Đã làm') {
				matchedQuick = item.is_completed ?? false;
			} else if (activeQuickFilter === 'Chưa làm') {
				matchedQuick = !item.is_completed;
			}

			return matchedQuick;
		});
	}, [documents, activeQuickFilter]);

	if (loading) {
		return <DocumentsPageSkeleton />;
	}

	return (
		<main className="dashboard-shell documents-page">
			<DashboardTopbar />

			<header className="documents-head">
				<h1 className="documents-title">Kho đề thi gốc</h1>
				<p className="text-soft">
					Đề gốc đã được chuẩn hoá và tách câu tự động. Chọn một đề để làm trọn bộ.
				</p>
			</header>

			<section className="documents-quick-filters" aria-label="Bộ lọc nhanh">
				{QUICK_FILTERS.map(({ value, label }) => (
					<button
						key={value}
						type="button"
						className={`documents-filter-pill ${activeQuickFilter === value ? 'is-active' : ''}`}
						onClick={() => setActiveQuickFilter(value)}
					>
						{label}
					</button>
				))}
			</section>

			{busy ? (
				<p className="documents-message practice-status" role="status" aria-live="polite">
					Đang xử lý đề mới...
				</p>
			) : null}

			<details className="ingest-panel" open={queued.length > 0}>
				<summary className="ingest-summary">
					Nạp đề mới: {ingest?.manual ? 'thủ công' : 'tự động'}
					{queued.length ? ` • ${queued.length} đường dẫn chờ duyệt` : ''}
				</summary>

				<div className="ingest-modes">
					{INGEST_MODES.map(({ manual, label }) => (
						<button
							key={label}
							type="button"
							className={`documents-filter-pill ingest-mode-pill ${ingest?.manual === manual ? 'is-active' : ''}`}
							onClick={() => void runIngestAction(() => setIngestMode(manual))}
						>
							{label}
						</button>
					))}
				</div>

				{queued.length === 0 ? (
					<p className="ingest-queue-empty">Chưa có đường dẫn nào chờ duyệt.</p>
				) : null}

				<ul className="ingest-queue">
					{queued.map((doc) => (
						<li key={doc.url} className="ingest-queue-row">
							<a
								className="ingest-queue-title"
								href={doc.url}
								title={doc.url}
								target="_blank"
								rel="noreferrer"
							>
								{doc.title || doc.url}
							</a>
							<span className="ingest-queue-meta">{doc.concept}</span>
							<button
								type="button"
								className="ingest-queue-accept"
								disabled={busy}
								aria-label={`Cho ${doc.title || doc.url} qua OCR`}
								onClick={() => void runIngestAction(() => approveIngest(doc.url))}
							>
								✓
							</button>
							<button
								type="button"
								className="ingest-queue-drop"
								aria-label={`Xoá ${doc.title || doc.url} khỏi hàng chờ`}
								onClick={() => void runIngestAction(() => dropIngestDoc(doc.url))}
							>
								×
							</button>
						</li>
					))}
				</ul>

				{ingestError ? <p className="documents-error">{ingestError}</p> : null}
			</details>

			{error ? <p className="documents-error">{error}</p> : null}

			{!error ? (
				<>
					<p className="documents-count">
						Hiển thị {filteredDocuments.length} / {documents.length} đề thi
					</p>
					<section className="documents-grid">
						{filteredDocuments.map((item) => (
							<article
								key={item.id}
								className={`documents-card ${item.is_completed ? 'is-completed' : ''}`}
							>
								<div className="documents-card-top">
									<p className="documents-card-type">{getDocumentKicker(item)}</p>
									<h2 className="documents-card-title">{getDocumentTitle(item)}</h2>
									<p className="documents-card-stat">{formatDocumentPrimaryMetric(item)}</p>
									<p className="documents-card-meta">{formatDocumentSecondaryMeta(item)}</p>
								</div>
								<div className="documents-card-bottom">
									<div className="documents-tags">
										<span className="documents-tag">Lớp {item.grade}</span>
										<span
											className={`documents-tag ${item.is_completed ? 'documents-tag-completed' : ''}`}
										>
											{item.is_completed ? 'Đã làm' : 'Chưa làm'}
										</span>
									</div>
									<div className="documents-card-actions">
										<Link href={`/exams/${item.id}?intent=practice`} className="btn-ghost documents-start-btn">
											Luyện tập
										</Link>
										<Link href={`/exams/${item.id}`} className="btn-primary documents-start-btn">
											Làm đề thi
										</Link>
									</div>
								</div>
							</article>
						))}
					</section>

					{filteredDocuments.length === 0 ? (
						<div className="documents-empty">
							{documents.length === 0
								? 'Kho đề đang trống. Bật nạp thủ công rồi cho một đường dẫn qua OCR để thêm đề.'
								: 'Không tìm thấy đề phù hợp với bộ lọc hiện tại.'}
						</div>
					) : null}
				</>
			) : null}
		</main>
	);
}
