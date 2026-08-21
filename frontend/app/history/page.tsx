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

	// History rows only carry exam_id, so đề info comes from the document list.
	const docByExamId = useMemo(
		() => new Map(documents.map((document) => [document.id, document])),
		[documents],
	);

	// One card per đề; each attempt keeps its own numbered version, newest first.
	const groups = useMemo(() => {
		const byExamId = new Map<string, HistoryItem[]>();

		for (const item of items) {
			const attempts = byExamId.get(item.exam_id);
			attempts ? attempts.push(item) : byExamId.set(item.exam_id, [item]);
		}

		return [...byExamId.entries()]
			.map(([examId, attempts]) => {
				const ordered = [...attempts].sort((a, b) => a.created_at.localeCompare(b.created_at));
				const versions = ordered.map((item, idx) => ({ item, version: idx + 1 })).reverse();

				return { examId, versions, latest: versions[0] };
			})
			.sort((a, b) => b.latest.item.created_at.localeCompare(a.latest.item.created_at));
	}, [items]);

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
					<p className="documents-count">
						{items.length} lượt làm bài trên {groups.length} đề
					</p>

					<section className="documents-grid">
						{groups.map(({ examId, versions, latest }) => {
							const doc = docByExamId.get(examId);
							const duration = formatDuration(latest.item.duration_seconds);

							return (
								<article key={examId} className="documents-card">
									<div className="documents-card-top">
										<p className="documents-card-type">{doc?.exam_type?.trim() || 'Đề gốc'}</p>
										<h2 className="documents-card-title">
											{doc ? doc.title?.trim() || doc.subject : 'Đề đã xoá khỏi kho'}
										</h2>
										<p className="documents-card-stat">
											Lần gần nhất: {formatScore(latest.item.total_score)} điểm • Đúng{' '}
											{latest.item.correct_count}/{latest.item.total_questions} câu
										</p>
										<p className="documents-card-meta">
											{formatDateTime(latest.item.created_at)}
											{duration ? ` • ${duration}` : ''}
										</p>
									</div>
									<div className="documents-card-bottom">
										<div className="documents-tags">
											<span className="documents-tag">{versions.length} lần làm</span>
											{doc?.grade ? <span className="documents-tag">Lớp {doc.grade}</span> : null}
										</div>
										<details className="history-versions">
											<summary>Xem các lần đã làm</summary>
											<ol className="history-version-list">
												{versions.map(({ item, version }) => (
													<li key={item.history_id}>
														<Link href={`/history/${item.history_id}`} className="history-version-link">
															<span className="history-version-tag">Lần {version}</span>
															<span className="history-version-score">
																{formatScore(item.total_score)} điểm • {item.correct_count}/
																{item.total_questions}
															</span>
															<span className="history-version-date">
																{formatDateTime(item.created_at)} •{' '}
																{item.mode === 'exam' ? 'Đề thi' : 'Luyện tập'}
															</span>
														</Link>
													</li>
												))}
											</ol>
										</details>
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
