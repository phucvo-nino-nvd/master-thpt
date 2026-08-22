'use client';

import { EditableAnswerPanel } from '@/features/exams/components/editable-answer-panel';
import { QuestionFeedbackPanels } from '@/features/exams/components/feedback-panels';
import { MathText } from '@/features/exams/components/math-text';
import { ExamQuestionHeader } from '@/features/exams/components/question-header';
import { ResultAnswerPanel } from '@/features/exams/components/result-answer-panel';
import { AnswerValue, isAnswered, toApiAnswer } from '@/features/exams/lib/helpers';
import { FlatQuestion, flattenExam } from '@/features/exams/lib/types';
import {
	MAX_HINT_LEVEL,
	DocumentDetailResponse,
	Evaluation,
	askHint,
	askSolution,
	checkPracticeQuestion,
	createHistory,
	getDocumentDetail,
	submitExam,
} from '@/shared/api/client';
import { getApiErrorMessage } from '@/shared/api/error-message';
import {
	cacheExamDetail,
	clearCachedExamDetail,
	getCachedExamDetail,
} from '@/features/exams/lib/exam-runtime-store';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export default function ExamRoomPage() {
	const router = useRouter();
	const params = useParams<{ id: string }>();
	const searchParams = useSearchParams();
	const examId = typeof params?.id === 'string' ? params.id : '';
	const isPracticeMode = searchParams.get('intent') === 'practice';

	const [exam, setExam] = useState<DocumentDetailResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState('');
	const [checkError, setCheckError] = useState('');
	const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
	const [showExitConfirm, setShowExitConfirm] = useState(false);
	const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
	const [checkingQuestionId, setCheckingQuestionId] = useState<string | null>(null);
	const [checkedResults, setCheckedResults] = useState<Record<string, Evaluation>>({});
	const [hintFeedbacks, setHintFeedbacks] = useState<Record<string, string[]>>({});
	const [loadingHintQuestionId, setLoadingHintQuestionId] = useState<string | null>(null);
	const [hintError, setHintError] = useState('');
	const [solutions, setSolutions] = useState<Record<string, string>>({});
	const [loadingSolutionQuestionId, setLoadingSolutionQuestionId] = useState<string | null>(null);
	const [solutionError, setSolutionError] = useState('');
	const examStartAtRef = useRef<number>(Date.now());
	const autoSubmitTriggeredRef = useRef(false);
	const historyIdRef = useRef<string | null>(null);

	const flatQuestions = useMemo<FlatQuestion[]>(() => {
		if (!exam) {
			return [];
		}

		return flattenExam(exam.questions);
	}, [exam]);

	const activeQuestion = flatQuestions[activeQuestionIndex];

	const ensureHistoryId = useCallback(async () => {
		if (!historyIdRef.current) {
			const created = await createHistory({ exam_id: examId, mode: 'practice' });
			historyIdRef.current = created.history_id;
		}

		return historyIdRef.current;
	}, [examId]);

	const handlePracticeComplete = useCallback(async () => {
		const unchecked = flatQuestions.filter(
			(question) =>
				isAnswered(answers[question.question_id]) && !checkedResults[question.question_id],
		);

		clearCachedExamDetail(examId);
		router.push('/history');

		for (const question of unchecked) {
			try {
				await checkPracticeQuestion({
					history_id: await ensureHistoryId(),
					question_id: question.question_id,
					student_answer: toApiAnswer(answers[question.question_id] ?? ''),
				});
			} catch {
				return;
			}
		}
	}, [answers, checkedResults, examId, ensureHistoryId, flatQuestions, router]);

	const handlePracticeDiscard = useCallback(() => {
		clearCachedExamDetail(examId);
		router.push('/practice');
	}, [examId, router]);

	useEffect(() => {
		if (!examId) {
			setError('Không tìm thấy mã đề thi.');
			setLoading(false);
			return;
		}

		async function loadExam() {
			setLoading(true);
			setError('');
			setSubmitError('');
			setCheckError('');

			try {
				const cachedExam = getCachedExamDetail(examId);
				if (cachedExam) {
					setExam(cachedExam);
					examStartAtRef.current = Date.now();
					return;
				}

				const data = await getDocumentDetail(examId);
				cacheExamDetail(data);
				setExam(data);
				examStartAtRef.current = Date.now();
			} catch (error) {
				setError(getApiErrorMessage(error, 'Không tải được đề thi. Vui lòng thử lại.'));
			} finally {
				setLoading(false);
			}
		}

		loadExam();
	}, [examId, router]);

	const isLowTime = remainingSeconds !== null && remainingSeconds <= 10 * 60;
	const activeHints = activeQuestion ? hintFeedbacks[activeQuestion.question_id] ?? [] : [];
	const activeSolution = activeQuestion ? solutions[activeQuestion.question_id] : '';
	const answeredCount = useMemo(
		() => flatQuestions.filter((question) => isAnswered(answers[question.question_id])).length,
		[answers, flatQuestions],
	);
	const remainingQuestionCount = Math.max(flatQuestions.length - answeredCount, 0);
	const progressPercent = flatQuestions.length > 0 ? Math.round((answeredCount / flatQuestions.length) * 100) : 0;

	const formattedRemainingTime = useMemo(() => {
		if (remainingSeconds === null) {
			return '--:--';
		}

		const safeSeconds = Math.max(remainingSeconds, 0);
		const hours = Math.floor(safeSeconds / 3600);
		const minutes = Math.floor((safeSeconds % 3600) / 60);
		const seconds = safeSeconds % 60;

		if (hours > 0) {
			return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
		}

		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	}, [remainingSeconds]);

	useEffect(() => {
		if (!exam) {
			setRemainingSeconds(null);
			autoSubmitTriggeredRef.current = false;
			return;
		}

		const durationInSeconds = Math.max(0, Math.floor(exam.duration_minutes * 60));
		setRemainingSeconds(durationInSeconds);
		autoSubmitTriggeredRef.current = false;

		const timer = window.setInterval(() => {
			setRemainingSeconds((prev) => {
				if (prev === null || prev <= 0) {
					return 0;
				}

				return prev - 1;
			});
		}, 1000);

		return () => {
			window.clearInterval(timer);
		};
	}, [exam]);

	function setAnswer(questionId: string, value: AnswerValue) {
		if (isPracticeMode && checkedResults[questionId]) {
			return;
		}

		setAnswers((prev) => ({
			...prev,
			[questionId]: value,
		}));
	}

	const handleSubmitExam = useCallback(async () => {
		if (!exam || isSubmitting) {
			return;
		}

		setShowSubmitConfirm(false);
		setSubmitError('');
		setIsSubmitting(true);

		try {
			const result = await submitExam({
				exam_id: exam.exam_id,
				answers: exam.questions.map((question) => ({
					question_id: question.id,
					student_answer: toApiAnswer(answers[question.id] ?? ''),
				})),
				duration_seconds: Math.max(1, Math.floor((Date.now() - examStartAtRef.current) / 1000)),
			});

			router.push(`/history/${result.history_id}`);
		} catch (error) {
			setSubmitError(getApiErrorMessage(error, 'Nộp bài thất bại. Vui lòng thử lại sau.'));
			setIsSubmitting(false);
		}
	}, [answers, exam, isSubmitting, router]);

	const handleCheckCurrentQuestion = useCallback(async () => {
		if (!activeQuestion || checkingQuestionId) {
			return;
		}

		setCheckError('');
		setCheckingQuestionId(activeQuestion.question_id);
		try {
			const evaluation = await checkPracticeQuestion({
				history_id: await ensureHistoryId(),
				question_id: activeQuestion.question_id,
				student_answer: toApiAnswer(answers[activeQuestion.question_id] ?? ''),
			});
			setCheckedResults((prev) => ({
				...prev,
				[activeQuestion.question_id]: evaluation,
			}));
		} catch (error) {
			setCheckError(getApiErrorMessage(error, 'Không thể kiểm tra câu này. Vui lòng thử lại.'));
		} finally {
			setCheckingQuestionId(null);
		}
	}, [activeQuestion, answers, checkingQuestionId, ensureHistoryId]);

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
				student_answer: toApiAnswer(answers[activeQuestion.question_id] ?? ''),
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
	}, [activeQuestion, answers, hintFeedbacks, loadingHintQuestionId]);

	const handleAskSolution = useCallback(async () => {
		const historyId = historyIdRef.current;

		if (!activeQuestion || !historyId || loadingSolutionQuestionId || solutions[activeQuestion.question_id]) {
			return;
		}

		if (!checkedResults[activeQuestion.question_id]) {
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
	}, [activeQuestion, checkedResults, loadingSolutionQuestionId, solutions]);

	function openSubmitConfirm() {
		if (isSubmitting) {
			return;
		}

		setShowSubmitConfirm(true);
	}

	function openExitConfirm() {
		if (isSubmitting) {
			return;
		}

		setShowExitConfirm(true);
	}

	function handleExitExamRoom() {
		setShowExitConfirm(false);
		clearCachedExamDetail(examId);
		router.push(isPracticeMode ? '/practice' : '/documents');
	}

	useEffect(() => {
		if (!exam || remainingSeconds === null || isSubmitting || isPracticeMode) {
			return;
		}

		if (remainingSeconds > 0 || autoSubmitTriggeredRef.current) {
			return;
		}

		autoSubmitTriggeredRef.current = true;
		handleSubmitExam();
	}, [exam, handleSubmitExam, isPracticeMode, isSubmitting, remainingSeconds]);

	if (loading) {
		return <main className="exam-room">Đang tải đề thi...</main>;
	}

	if (error || !exam || !activeQuestion) {
		return (
			<main className="exam-room">
				<p className="documents-error">{error || 'Không có dữ liệu đề thi.'}</p>
				{isPracticeMode ? (
					<button type="button" className="btn-ghost" onClick={handlePracticeDiscard}>
						Về luyện tập
					</button>
				) : (
					<Link href="/documents" className="btn-ghost">
						Quay lại
					</Link>
				)}
			</main>
		);
	}

	const checkedCurrentQuestion = checkedResults[activeQuestion.question_id];
	const isCurrentQuestionLocked = isPracticeMode && Boolean(checkedCurrentQuestion);

	return (
		<main className="exam-room">
			<header className="exam-header exam-result-header">
				<button
					type="button"
					className="exam-back-btn"
					onClick={openExitConfirm}
					aria-label={isPracticeMode ? 'Thoát luyện tập' : 'Thoát phòng thi'}
				>
					&lsaquo;
				</button>
				<div className="exam-header-main">
					<p className="documents-kicker">Đang làm bài</p>
					<h1 className="documents-title">{exam.subject} - {exam.title}</h1>
					<div className="exam-result-meta">
						<span className="documents-tag">{isPracticeMode ? 'Luyện tập' : 'Đề thi'}</span>
						{exam.grade ? <span>Lớp {exam.grade}</span> : null}
						<span>{exam.total_questions} câu</span>
						{isPracticeMode ? null : <span>{exam.duration_minutes} phút</span>}
					</div>
				</div>
				<div className="exam-header-side">
					<div className="exam-result-hero">
						<p className="exam-result-hero-label">Tiến độ</p>
						<p className="exam-result-hero-value">{answeredCount}/{flatQuestions.length}</p>
						<p className="exam-result-hero-meta">
							Còn {remainingQuestionCount} câu • {progressPercent}%
						</p>
					</div>
				</div>
			</header>

			<section className="exam-layout">
				<article className="exam-main">
					<div className="exam-question-shell">
						<ExamQuestionHeader
							questionIndex={activeQuestion.index}
							showHintButton={isPracticeMode}
							onAskHint={handleAskHint}
							isHintLoading={loadingHintQuestionId === activeQuestion.question_id}
							hintCount={activeHints.length}
							showSolutionButton={isPracticeMode && Boolean(checkedCurrentQuestion)}
							onAskSolution={handleAskSolution}
							isSolutionLoading={loadingSolutionQuestionId === activeQuestion.question_id}
							hasSolution={Boolean(activeSolution)}
							statusText={checkedCurrentQuestion && (checkedCurrentQuestion.correct ? 'Trả lời đúng' : 'Trả lời sai')}
							statusTone={checkedCurrentQuestion && (checkedCurrentQuestion.correct ? 'is-correct' : 'is-wrong')}
						/>

						<div className="exam-question-content"><MathText text={activeQuestion.question.content} /></div>

						<QuestionFeedbackPanels
							hintError={hintError}
							hints={activeHints}
							solutionError={solutionError}
							solution={activeSolution}
						/>

						{checkedCurrentQuestion ? (
							<ResultAnswerPanel
								question={activeQuestion}
								studentAnswer={answers[activeQuestion.question_id]}
								correctAnswer={activeQuestion.question.answer}
								evaluation={checkedCurrentQuestion}
							/>
						) : (
							<EditableAnswerPanel
								question={activeQuestion}
								answer={answers[activeQuestion.question_id]}
								onChange={(value) => setAnswer(activeQuestion.question_id, value)}
							/>
						)}
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
					{isPracticeMode ? null : (
						<div className={`exam-timer ${isLowTime ? 'is-warning' : ''}`}>
							<p className="exam-timer-label">Thời gian còn lại</p>
							<p className="exam-timer-value">{formattedRemainingTime}</p>
						</div>
					)}

					<h3>Danh sách câu</h3>
					<div className="exam-index-grid">
						{flatQuestions.map((item, idx) => {
							const active = idx === activeQuestionIndex;
							const answered = isAnswered(answers[item.question_id]);
							const checkedResult = checkedResults[item.question_id];
							const stateClass = checkedResult
								? (checkedResult.correct ? 'is-correct' : 'is-wrong')
								: answered
									? 'is-answered'
									: 'is-unanswered';

							return (
								<button
									key={item.question_id}
									type="button"
									className={`exam-index-btn ${stateClass} ${active ? 'is-active' : ''}`}
									onClick={() => setActiveQuestionIndex(idx)}
								>
									{item.index}
								</button>
							);
						})}
					</div>

					<div className="exam-submit-wrap">
						{isPracticeMode ? (
							<>
								<button
									type="button"
									className="exam-submit-btn"
									onClick={handleCheckCurrentQuestion}
									disabled={checkingQuestionId === activeQuestion.question_id || isCurrentQuestionLocked}
								>
									{checkingQuestionId === activeQuestion.question_id ? (
										<>
											<span className="exam-submit-spinner" aria-hidden="true" />
											Đang kiểm tra...
										</>
									) : isCurrentQuestionLocked ? (
										'Đã kiểm tra câu này'
									) : (
										'Kiểm tra câu này'
									)}
								</button>
								<button
									type="button"
									className="exam-submit-btn"
									onClick={handlePracticeComplete}
								>
									Xong
								</button>
								{checkError ? <p className="documents-error exam-submit-error">{checkError}</p> : null}
							</>
						) : (
							<>
								<button
									type="button"
									className="exam-submit-btn"
									onClick={openSubmitConfirm}
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<>
											<span className="exam-submit-spinner" aria-hidden="true" />
											Đang nộp bài...
										</>
									) : (
										'Nộp bài'
									)}
								</button>
								{submitError ? <p className="documents-error exam-submit-error">{submitError}</p> : null}
							</>
						)}
					</div>
				</aside>
			</section>

			{!isPracticeMode && showSubmitConfirm ? (
				<div className="exam-submit-confirm-overlay" role="dialog" aria-modal="true" aria-labelledby="submit-confirm-title">
					<div className="exam-submit-confirm-card">
						<h3 id="submit-confirm-title">Xác nhận nộp bài?</h3>
						<p>
							Sau khi nộp, hệ thống sẽ chấm điểm và chuyển sang trang xem lại bài làm.
						</p>
						<div className="exam-submit-confirm-actions">
							<button
								type="button"
								className="btn-ghost"
								onClick={() => setShowSubmitConfirm(false)}
								disabled={isSubmitting}
							>
								Hủy
							</button>
							<button
								type="button"
								className="exam-submit-confirm-btn"
								onClick={handleSubmitExam}
								disabled={isSubmitting}
							>
								{isSubmitting ? 'Đang nộp bài...' : 'Xác nhận nộp bài'}
							</button>
						</div>
					</div>
				</div>
			) : null}

			{showExitConfirm ? (
				<div className="exam-submit-confirm-overlay" role="dialog" aria-modal="true" aria-labelledby="exit-confirm-title">
					<div className="exam-submit-confirm-card exam-exit-confirm-card">
						<p className="exam-exit-confirm-kicker">Cảnh báo</p>
						<h3 id="exit-confirm-title">{isPracticeMode ? 'Thoát luyện tập?' : 'Thoát phòng thi?'}</h3>
						<p>
							{isPracticeMode
								? 'Các câu đã kiểm tra vẫn được lưu, những câu chưa kiểm tra sẽ mất.'
								: 'Nếu thoát phòng thi lúc này, bài làm hiện tại sẽ không được lưu lại.'}
						</p>
						<div className="exam-submit-confirm-actions">
							<button
								type="button"
								className="btn-ghost"
								onClick={() => setShowExitConfirm(false)}
								disabled={isSubmitting}
							>
								Ở lại làm bài
							</button>
							<button
								type="button"
								className="btn-danger"
								onClick={handleExitExamRoom}
								disabled={isSubmitting}
							>
								Thoát và bỏ bài làm
							</button>
						</div>
					</div>
				</div>
			) : null}
		</main>
	);
}
