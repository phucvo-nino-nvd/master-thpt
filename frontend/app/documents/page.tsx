'use client';

import { DocumentsPageSkeleton } from '@/features/dashboard/components/loading-skeletons';
import { DashboardTopbar } from '@/features/dashboard/components/dashboard-topbar';
import { DocumentItem, getDocuments } from '@/shared/api/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

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

	useEffect(() => {
		async function loadDocuments() {
			setLoading(true);
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
	}, [router]);

	const filteredDocuments = useMemo(() => {
		return documents.filter((item) => {
			let matchedQuick = true;
			if (activeQuickFilter === 'Toán 12') {
				matchedQuick = item.subject?.includes('Toán') && String(item.grade) === '12';
			} else if (activeQuickFilter === 'Đề thi thử') {
				matchedQuick = item.exam_type?.includes('thử') ?? false;
			} else if (activeQuickFilter === 'Đề chính thức') {
				matchedQuick = item.exam_type?.includes('chính thức') ?? false;
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
				<button
					type="button"
					className={`documents-filter-pill ${activeQuickFilter === 'all' ? 'is-active' : ''}`}
					onClick={() => setActiveQuickFilter('all')}
				>
					Tất cả
				</button>
				<button
					type="button"
					className={`documents-filter-pill ${activeQuickFilter === 'Toán 12' ? 'is-active' : ''}`}
					onClick={() => setActiveQuickFilter('Toán 12')}
				>
					Toán 12
				</button>
				<button
					type="button"
					className={`documents-filter-pill ${activeQuickFilter === 'Đề thi thử' ? 'is-active' : ''}`}
					onClick={() => setActiveQuickFilter('Đề thi thử')}
				>
					Đề thi thử
				</button>
				<button
					type="button"
					className={`documents-filter-pill ${activeQuickFilter === 'Đề chính thức' ? 'is-active' : ''}`}
					onClick={() => setActiveQuickFilter('Đề chính thức')}
				>
					Đề chính thức
				</button>
				<button
					type="button"
					className={`documents-filter-pill ${activeQuickFilter === 'Chưa làm' ? 'is-active' : ''}`}
					onClick={() => setActiveQuickFilter('Chưa làm')}
				>
					Chưa làm
				</button>
			</section>

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
										{item.is_completed ? (
											<span className="documents-tag documents-tag-completed">Đã hoàn thành</span>
										) : null}
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
							Không tìm thấy đề phù hợp với bộ lọc hiện tại.
						</div>
					) : null}
				</>
			) : null}
		</main>
	);
}
