'use client';

import { QuestionFeedbackPanels } from '@/features/exams/components/feedback-panels';
import { formatDateTime, formatDuration, formatScore, isAnswered } from '@/features/exams/lib/helpers';
import { MathText } from '@/features/exams/components/math-text';
import { ExamQuestionHeader } from '@/features/exams/components/question-header';
import { ResultAnswerPanel } from '@/features/exams/components/result-answer-panel';
import { FlatQuestion, flattenExam } from '@/features/exams/lib/types';
import {
	MAX_HINT_LEVEL,
	DocumentDetailResponse,
	HistoryDetailResponse,
	HistoryMode,
	HistoryQuestion,
	askHint,
	askSolution,
	getDocumentDetail,
	getHistoryDetail,
} from '@/shared/api/client';
import { getApiErrorMessage } from '@/shared/api/error-message';
import { getCachedExamDetail } from '@/features/exams/lib/exam-runtime-store';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DashboardTopbar } from '@/features/dashboard/components/dashboard-topbar';

function modeToLabel(mode: HistoryMode) {
	return mode === 'exam' ? 'Đề thi' : 'Luyện tập';
}

export default function HistoryDetailPage() {
	const params = useParams<{ id: string }>();
	const historyId = typeof params?.id === 'string' ? params.id : '';

	const [history, setHistory] = useState<HistoryDetailResponse | null>(null);
	const [exam, setExam] = useState<DocumentDetailResponse | null>(null);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(true);
	const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
	const [hintFeedbacks, setHintFeedbacks] = useState<Record<string, string[]>>({});
	const [loadingHintQuestionId, setLoadingHintQuestionId] = useState<string | null>(null);
	const [hintError, setHintError] = useState('');
	const [solutions, setSolutions] = useState<Record<string, string>>({});
	const [loadingSolutionQuestionId, setLoadingSolutionQuestionId] = useState<string | null>(null);
	const [solutionError, setSolutionError] = useState('');

	useEffect(() => {
		if (!historyId) {
			setError('Không tìm thấy lượt làm bài.');
			setLoading(false);
			return;
		}

		async function loadHistoryDetail() {
			setLoading(true);
			setError('');

			try {
				const detail = await getHistoryDetail(historyId);
				setHistory(detail);
				setExam(getCachedExamDetail(detail.exam_id) ?? (await getDocumentDetail(detail.exam_id)));
			} catch (error) {
				setError(getApiErrorMessage(error, 'Không tải được chi tiết bài làm.'));
			} finally {
				setLoading(false);
			}
		}

		loadHistoryDetail();
	}, [historyId]);

	const answeredByQuestionId = useMemo(() => {
		const entries = history?.questions.map((item) => [item.question_id, item] as const) ?? [];

		return new Map<string, HistoryQuestion>(entries);
	}, [history]);

	// Only graded questions are reviewable; practice runs grade one question at a time.
	const flatQuestions = useMemo<FlatQuestion[]>(() => {
		if (!exam) {
			return [];
		}

		return flattenExam(exam.questions).filter((item) => answeredByQuestionId.has(item.question_id));
	}, [answeredByQuestionId, exam]);

	const activeQuestion = flatQuestions[activeQuestionIndex];
	const activeAnswer = activeQuestion ? answeredByQuestionId.get(activeQuestion.question_id) : undefined;
	const activeHints = activeQuestion ? hintFeedbacks[activeQuestion.question_id] ?? [] : [];
	const activeSolution = activeQuestion ? solutions[activeQuestion.question_id] : '';

	const handleAskHint = useCallback(async () => {
		if (!activeQuestion || loadingHintQuestionId) {
			return;
		}

		const seen = hintFeedbacks[activeQuestion.question_id] ?? [];

		if (seen.length >= MAX_HINT_LEVEL) {
			return;
		}

		setHintError('');
		setLoadingHintQuestionId(activeQuestion.question_id);
		try {
			const data = await askHint({
				question_id: activeQuestion.question_id,
				level: seen.length + 1,
				student_answer: activeAnswer?.student_answer ?? '',
			});
			setHintFeedbacks((prev) => ({
				...prev,
				[activeQuestion.question_id]: [...(prev[activeQuestion.question_id] ?? []), data.hint],
			}));
		} catch (error) {
			setHintError(getApiErrorMessage(error, 'Không thể lấy gợi ý lúc này. Vui lòng thử lại.'));
		} finally {
			setLoadingHintQuestionId(null);
		}
	}, [activeAnswer, activeQuestion, hintFeedbacks, loadingHintQuestionId]);

	const handleAskSolution = useCallback(async () => {
		if (!activeQuestion || loadingSolutionQuestionId || solutions[activeQuestion.question_id]) {
			return;
		}

		setSolutionError('');
		setLoadingSolutionQuestionId(activeQuestion.question_id);
		try {
			const data = await askSolution({
				history_id: historyId,
				question_id: activeQuestion.question_id,
			});
			setSolutions((prev) => ({
				...prev,
				[activeQuestion.question_id]: data.solution,
			}));
		} catch (error) {
			setSolutionError(getApiErrorMessage(error, 'Không thể lấy lời giải lúc này. Vui lòng thử lại.'));
		} finally {
			setLoadingSolutionQuestionId(null);
		}
	}, [activeQuestion, historyId, loadingSolutionQuestionId, solutions]);

	if (loading) {
		return (
			<main className="dashboard-shell exam-room">
				<DashboardTopbar />
				<p>Đang tải bài làm...</p>
			</main>
		);
	}

	if (error || !history || !exam || !activeQuestion || !activeAnswer) {
		return (
			<main className="dashboard-shell exam-room">
				<DashboardTopbar />
				<p className="documents-error">{error || 'Lượt làm bài này chưa có câu nào được chấm.'}</p>
				<Link href="/history" className="btn-primary">
					Về lịch sử làm bài
				</Link>
			</main>
		);
	}

	const duration = formatDuration(history.duration_seconds);

	return (
		<main className="dashboard-shell exam-room exam-result-room">
			<DashboardTopbar />
			<header className="exam-header exam-result-header">
				<Link href="/history" className="exam-back-btn" aria-label="Về lịch sử làm bài">&lsaquo;</Link>
				<div className="exam-header-main">
					<p className="documents-kicker">Xem lại bài làm</p>
					<h1 className="documents-title">{exam.subject} - {exam.title}</h1>
					<div className="exam-result-meta">
						<span className="documents-tag">{modeToLabel(history.mode)}</span>
						{exam.grade ? <span>Lớp {exam.grade}</span> : null}
						<span>{formatDateTime(history.created_at)}</span>
						{duration ? <span>{duration}</span> : null}
					</div>
				</div>
				<div className="exam-header-side">
					<div className="exam-result-hero">
						<p className="exam-result-hero-label">Điểm tổng</p>
						<p className="exam-result-hero-value">{formatScore(history.total_score)}</p>
						<p className="exam-result-hero-meta">
							Đúng {history.correct_count}/{history.total_questions} câu
						</p>
					</div>
				</div>
			</header>

			<section className="exam-layout">
				<article className="exam-main">
					<div className="exam-question-shell">
						<ExamQuestionHeader
							questionIndex={activeQuestion.index}
							showHintButton
							onAskHint={handleAskHint}
							isHintLoading={loadingHintQuestionId === activeQuestion.question_id}
							hintCount={activeHints.length}
							showSolutionButton
							onAskSolution={handleAskSolution}
							isSolutionLoading={loadingSolutionQuestionId === activeQuestion.question_id}
							hasSolution={Boolean(activeSolution)}
							statusText={activeAnswer.evaluation.correct ? 'Trả lời đúng' : 'Trả lời sai'}
							statusTone={activeAnswer.evaluation.correct ? 'is-correct' : 'is-wrong'}
						/>

						<div className="exam-question-content"><MathText text={activeQuestion.question.content} /></div>

						<QuestionFeedbackPanels
							hintError={hintError}
							hints={activeHints}
							solutionError={solutionError}
							solution={activeSolution}
						/>

						<ResultAnswerPanel
							question={activeQuestion}
							studentAnswer={activeAnswer.student_answer}
							correctAnswer={activeQuestion.question.answer}
							evaluation={activeAnswer.evaluation}
						/>
					</div>

					<div className="exam-main-actions">
						<button
							type="button"
							className="btn-ghost"
							disabled={activeQuestionIndex === 0}
							onClick={() => setActiveQuestionIndex((prev) => Math.max(prev - 1, 0))}
						>
							Câu trước
						</button>
						<button
							type="button"
							className="btn-primary"
							disabled={activeQuestionIndex >= flatQuestions.length - 1}
							onClick={() => setActiveQuestionIndex((prev) => Math.min(prev + 1, flatQuestions.length - 1))}
						>
							Câu tiếp
						</button>
					</div>
				</article>

				<aside className="exam-sidebar">
					<h3>Kết quả từng câu</h3>
					<div className="exam-index-grid">
						{flatQuestions.map((item, idx) => {
							const isActive = idx === activeQuestionIndex;
							const answered = answeredByQuestionId.get(item.question_id);
							const stateClass = !isAnswered(answered?.student_answer)
								? 'is-unanswered'
								: answered?.evaluation.correct
									? 'is-correct'
									: 'is-wrong';

							return (
								<button
									key={item.question_id}
									type="button"
									className={`exam-index-btn ${stateClass} ${isActive ? 'is-active' : ''}`}
									onClick={() => setActiveQuestionIndex(idx)}
								>
									{item.index}
								</button>
							);
						})}
					</div>
				</aside>
			</section>
		</main>
	);
}
