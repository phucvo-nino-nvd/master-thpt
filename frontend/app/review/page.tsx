'use client';

import { DashboardTopbar } from '@/features/dashboard/components/dashboard-topbar';
import { DocumentsPageSkeleton } from '@/features/dashboard/components/loading-skeletons';
import { formatDateTime } from '@/features/exams/lib/helpers';
import {
	DocumentItem,
	HistoryDetailResponse,
	HistoryItem,
	KnowledgeGraphNode,
	getDocuments,
	getHistoryDetail,
	getHistoryList,
	getKnowledgeGraph,
} from '@/shared/api/client';
import { useEffect, useMemo, useState } from 'react';

const RECENT_ATTEMPTS = 5;
const TIMELINE_LIMIT = 8;
const WEAK_RATIO = 0.5;
const MASTERED_RATIO = 0.8;

function ratioClass(correct: number, total: number) {
	if (total === 0) {
		return 'is-learning';
	}

	const ratio = correct / total;

	if (ratio < WEAK_RATIO) {
		return 'is-weak';
	}

	return ratio < MASTERED_RATIO ? 'is-learning' : 'is-mastered';
}

export default function ReviewPage() {
	const [attempts, setAttempts] = useState<HistoryItem[]>([]);
	const [documents, setDocuments] = useState<DocumentItem[]>([]);
	const [nodes, setNodes] = useState<KnowledgeGraphNode[]>([]);
	const [details, setDetails] = useState<HistoryDetailResponse[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		async function loadReview() {
			setLoading(true);
			setError('');

			try {
				const [history, documentList, graph] = await Promise.all([
					getHistoryList(),
					getDocuments(),
					getKnowledgeGraph(),
				]);

				const recent = [...history]
					.sort((a, b) => b.created_at.localeCompare(a.created_at))
					.slice(0, RECENT_ATTEMPTS);

				setAttempts(history);
				setDocuments(documentList);
				setNodes(graph.nodes);
				setDetails(await Promise.all(recent.map((item) => getHistoryDetail(item.history_id))));
			} catch {
				setError('Không thể tải thống kê ôn tập. Vui lòng thử lại.');
			} finally {
				setLoading(false);
			}
		}

		loadReview();
	}, []);

	const titleOf = useMemo(() => {
		const nameByExamId = new Map<string, string>();

		for (const node of nodes) {
			nameByExamId.set(node.id, node.label);
		}

		for (const document of documents) {
			nameByExamId.set(document.id, document.title?.trim() || document.subject);
		}

		return (examId: string) => nameByExamId.get(examId) || 'Đề đã xoá khỏi kho';
	}, [documents, nodes]);

	const timeline = useMemo(
		() =>
			[...attempts]
				.sort((a, b) => b.created_at.localeCompare(a.created_at))
				.slice(0, TIMELINE_LIMIT),
		[attempts],
	);

	const bars = useMemo(
		() => nodes.filter((node) => node.score !== null).sort((a, b) => (b.score ?? 0) - (a.score ?? 0)),
		[nodes],
	);

	const mistakes = useMemo(() => {
		const byExamId = new Map<string, { wrong: string[]; total: number }>();

		for (const detail of details) {
			const group = byExamId.get(detail.exam_id) ?? { wrong: [], total: 0 };

			for (const question of detail.questions) {
				group.total += 1;

				if (!question.evaluation.correct) {
					group.wrong.push(question.evaluation.feedback);
				}
			}

			byExamId.set(detail.exam_id, group);
		}

		return [...byExamId.entries()]
			.filter(([, group]) => group.wrong.length > 0)
			.sort((a, b) => b[1].wrong.length - a[1].wrong.length);
	}, [details]);

	if (loading) {
		return <DocumentsPageSkeleton cardCount={3} />;
	}

	return (
		<main className="dashboard-shell documents-page">
			<DashboardTopbar />

			<header className="documents-head">
				<h1 className="documents-title">Ôn tập &amp; thống kê</h1>
				<p className="text-soft">
					Mức thành thạo được cập nhật sau mỗi câu đã chấm. Lỗi sai lấy từ nhận xét của{' '}
					{RECENT_ATTEMPTS} lượt làm gần nhất.
				</p>
			</header>

			{error ? <p className="documents-error">{error}</p> : null}

			{!error ? (
				<div className="review-layout">
					<section className="review-block">
						<p className="documents-kicker">Lịch sử luyện tập</p>

						{timeline.length === 0 ? (
							<p className="review-empty">Chưa có lượt làm bài nào.</p>
						) : (
							<ol className="review-timeline">
								{timeline.map((item) => (
									<li key={item.history_id}>
										<p className="review-attempt-date">{formatDateTime(item.created_at)}</p>
										<p className="review-attempt-title">
											{titleOf(item.exam_id)} — {item.total_questions} câu
											<span
												className={`review-attempt-score ${ratioClass(
													item.correct_count,
													item.total_questions,
												)}`}
											>
												{item.correct_count}/{item.total_questions} đúng
											</span>
										</p>
									</li>
								))}
							</ol>
						)}
					</section>

					<div>
						<section className="review-block">
							<p className="documents-kicker">Mức thành thạo theo chủ đề</p>

							{bars.length === 0 ? (
								<p className="review-empty">
									Chưa có chủ đề nào được chấm. Làm một đề rồi nộp bài để bắt đầu đo.
								</p>
							) : (
								<div className="review-bars">
									{bars.map((node) => (
										<div key={node.id} className="review-bar">
											<span className="review-bar-label" title={node.label}>
												{node.label}
											</span>
											<span className="review-bar-track">
												<span
													className={`review-bar-fill is-${node.status}`}
													style={{ width: `${node.score}%` }}
												/>
											</span>
											<span className="review-bar-score">{node.score}%</span>
										</div>
									))}
								</div>
							)}
						</section>

						<section className="review-block">
							<p className="documents-kicker">Lỗi sai thường gặp</p>

							{mistakes.length === 0 ? (
								<p className="review-empty">
									Không có câu sai nào trong {RECENT_ATTEMPTS} lượt gần nhất.
								</p>
							) : (
								<div className="review-mistakes">
									{mistakes.map(([examId, group]) => (
										<article key={examId} className="review-mistake">
											<h2 className="review-mistake-title">{titleOf(examId)}</h2>
											<p className="review-mistake-meta">
												Sai {group.wrong.length}/{group.total} câu trong {RECENT_ATTEMPTS} lượt gần
												nhất
											</p>
											<ul className="review-mistake-list">
												{group.wrong.map((feedback, index) => (
													<li key={index}>{feedback}</li>
												))}
											</ul>
										</article>
									))}
								</div>
							)}
						</section>
					</div>
				</div>
			) : null}
		</main>
	);
}
