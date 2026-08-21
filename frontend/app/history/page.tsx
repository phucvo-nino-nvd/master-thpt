'use client';

import { DashboardTopbar } from '@/features/dashboard/components/dashboard-topbar';
import { DocumentsPageSkeleton } from '@/features/dashboard/components/loading-skeletons';
import { formatDateTime, formatDuration, formatScore } from '@/features/exams/lib/helpers';
import { DocumentItem, HistoryItem, getDocuments, getHistoryList } from '@/shared/api/client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export default function HistoryPage() {
	const [items, setItems] = useState<HistoryItem[]>([]);
	const [documents, setDocuments] = useState<DocumentItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		async function loadHistory() {
			setLoading(true);
			setError('');

			try {
				const [history, documents] = await Promise.all([getHistoryList(), getDocuments()]);
				setItems(history);
				setDocuments(documents);
			} catch {
				setError('Không thể tải lịch sử làm bài. Vui lòng thử lại.');
			} finally {
				setLoading(false);
			}
		}

		loadHistory();
	}, []);

	// History rows only carry exam_id, so titles come from the document list.
	const titleByExamId = useMemo(
		() => new Map(documents.map((document) => [document.id, document.title?.trim() || document.subject])),
		[documents],
	);

	if (loading) {
		return <DocumentsPageSkeleton cardCount={4} />;
	}

	return (
		<main className="dashboard-shell documents-page">
			<DashboardTopbar />

			<header className="documents-head">
				<h1 className="documents-title">Lịch sử làm bài</h1>
				<p className="text-soft">
					Mỗi lượt làm bài đã chấm được lưu lại. Mở một lượt để xem đáp án và lời giải từng câu.
				</p>
			</header>

			{error ? <p className="documents-error">{error}</p> : null}

			{!error ? (
				<>
					<p className="documents-count">Có {items.length} lượt làm bài</p>

					<section className="documents-grid">
						{items.map((item) => {
							const duration = formatDuration(item.duration_seconds);

							return (
								<article key={item.history_id} className="documents-card">
									<div className="documents-card-top">
										<p className="documents-card-type">
											{item.mode === 'exam' ? 'Đề thi' : 'Luyện tập'}
										</p>
										<h2 className="documents-card-title">
											{titleByExamId.get(item.exam_id) ?? 'Đề đã xoá khỏi kho'}
										</h2>
										<p className="documents-card-stat">
											{formatScore(item.total_score)} điểm • Đúng {item.correct_count}/{item.total_questions} câu
										</p>
										<p className="documents-card-meta">
											{formatDateTime(item.created_at)}
											{duration ? ` • ${duration}` : ''}
										</p>
									</div>
									<div className="documents-card-bottom">
										<div className="documents-tags">
											<span className="documents-tag">{item.total_questions} câu đã chấm</span>
										</div>
										<div className="documents-card-actions">
											<Link href={`/history/${item.history_id}`} className="btn-primary documents-start-btn">
												Xem lại
											</Link>
										</div>
									</div>
								</article>
							);
						})}
					</section>

					{items.length === 0 ? (
						<div className="documents-empty">
							Chưa có lượt làm bài nào. Làm một đề rồi nộp bài để xem lại ở đây.
						</div>
					) : null}
				</>
			) : null}
		</main>
	);
}
