'use client';

import { MathText } from '@/features/exams/components/math-text';
import { FlatQuestion, flattenExam } from '@/features/exams/lib/types';
import {
	AskHintResponse,
	DocumentDetailResponse,
	QuestionType,
	PracticeQuestionCheckResponse,
	askHint,
	checkPracticeQuestion,
	createHistory,
	getDocumentDetail,
	reviewMistake,
	submitExam,
} from '@/shared/api/client';
import { getApiErrorMessage } from '@/shared/api/error-message';
import {
	cacheExamDetail,
	cacheExamQuestionTimings,
	cacheExamResult,
	clearCachedExamQuestionTimings,
	clearCachedExamResult,
	clearExamRuntimeCache,
	getCachedExamDetail,
} from '@/features/exams/lib/exam-runtime-store';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DashboardTopbar } from '@/features/dashboard/components/dashboard-topbar';

function hasAnswerValue(value?: string) {
	if (!value) {
		return false;
	}
	return value.split(',').some((token) => token.trim().length > 0);
}

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

const TYPE_LABELS: Record<QuestionType, string> = {
	multiple_choice: 'TRẮC NGHIỆM',
	true_false: 'ĐÚNG / SAI',
	short_answer: 'TRẢ LỜI NGẮN',
};

export default function PracticeRoomPage() {
	const router = useRouter();
	const params = useParams<{ id: string }>();
	const examId = typeof params?.id === 'string' ? params.id : '';

	const [exam, setExam] = useState<DocumentDetailResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState<Record<string, string>>({});
	const [checkingQuestionId, setCheckingQuestionId] = useState<string | null>(null);
	const [checkedResults, setCheckedResults] = useState<Record<string, PracticeQuestionCheckResponse>>({});
	const [hintFeedbacks, setHintFeedbacks] = useState<Record<string, AskHintResponse>>({});
	const [loadingHintQuestionId, setLoadingHintQuestionId] = useState<string | null>(null);
	const [hintError, setHintError] = useState('');
	const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

	const examStartAtRef = useRef<number>(Date.now());

	const flatQuestions = useMemo<FlatQuestion[]>(() => {
		if (!exam) return [];
		return flattenExam(exam.questions);
	}, [exam]);

	const activeQuestion = flatQuestions[activeQuestionIndex];

	const sections = useMemo(() => {
		const groups: Array<{ label: string; items: Array<{ question: FlatQuestion; index: number }> }> = [];

		flatQuestions.forEach((question, index) => {
			const label = `PHẦN ${question.question.section} · ${TYPE_LABELS[question.sectionType]}`;
			const last = groups[groups.length - 1];

			if (last?.label === label) {
				last.items.push({ question, index });
			} else {
				groups.push({ label, items: [{ question, index }] });
			}
		});

		return groups;
	}, [flatQuestions]);

	useEffect(() => {
		if (!examId) {
			setError('Không tìm thấy mã đề thi.');
			setLoading(false);
			return;
		}

		async function loadExam() {
			setLoading(true);
			setError('');
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

	const formattedRemainingTime = useMemo(() => {
		if (remainingSeconds === null) return '--:--';
		const safeSeconds = Math.max(remainingSeconds, 0);
		const minutes = Math.floor(safeSeconds / 60);
		const seconds = safeSeconds % 60;
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	}, [remainingSeconds]);

	useEffect(() => {
		if (!exam) {
			setRemainingSeconds(null);
			return;
		}
		const durationInSeconds = Math.max(0, Math.floor(exam.duration_minutes * 60));
		setRemainingSeconds(durationInSeconds);

		const timer = window.setInterval(() => {
			setRemainingSeconds((prev) => {
				if (prev === null || prev <= 0) return 0;
				return prev - 1;
			});
		}, 1000);

		return () => window.clearInterval(timer);
	}, [exam]);

	function setAnswer(questionId: string, value: string) {
		if (checkedResults[questionId]) return;
		setAnswers((prev) => ({ ...prev, [questionId]: value }));
	}

	const handleCheckCurrentQuestion = useCallback(async () => {
		if (!exam || !activeQuestion || checkingQuestionId) return;

		setCheckingQuestionId(activeQuestion.question_id);
		try {
			const result = await checkPracticeQuestion({
				exam_id: exam.exam_id,
				question_id: activeQuestion.question_id,
				student_answer: answers[activeQuestion.question_id] ?? '',
			});
			setCheckedResults((prev) => ({
				...prev,
				[activeQuestion.question_id]: result,
			}));
		} catch {
			// handle error silently or show toast
		} finally {
			setCheckingQuestionId(null);
		}
	}, [activeQuestion, answers, checkingQuestionId, exam]);

	const handleAskHint = useCallback(async () => {
		if (!activeQuestion || !exam || loadingHintQuestionId || hintFeedbacks[activeQuestion.question_id]) return;

		setHintError('');
		setLoadingHintQuestionId(activeQuestion.question_id);
		try {
			const data = await askHint({
				exam_id: exam.exam_id,
				question_id: activeQuestion.question_id,
			});
			setHintFeedbacks((prev) => ({
				...prev,
				[activeQuestion.question_id]: data,
			}));
		} catch (error) {
			setHintError('Không thể lấy gợi ý.');
		} finally {
			setLoadingHintQuestionId(null);
		}
	}, [activeQuestion, exam, hintFeedbacks, loadingHintQuestionId]);

	if (loading) {
		return <main className="dashboard-shell">Đang tải đề thi...</main>;
	}

	if (error || !exam || !activeQuestion) {
		return (
			<main className="dashboard-shell">
				<DashboardTopbar />
				<p className="documents-error">{error || 'Không có dữ liệu đề thi.'}</p>
			</main>
		);
	}

	const checkedCurrentQuestion = checkedResults[activeQuestion.question_id];
	const isCurrentQuestionLocked = Boolean(checkedCurrentQuestion);
	const activeHintObj = hintFeedbacks[activeQuestion.question_id];

	return (
		<main className="dashboard-shell practice-room">
			<DashboardTopbar />
			<div className="practice-top-nav">
				<div className="practice-breadcrumb">
					<span>{exam.subject}</span>
					<span>&rsaquo;</span>
					<span className="practice-breadcrumb-active">{exam.title}</span>
				</div>
				<div className="practice-progress">
					{flatQuestions.map((q, idx) => {
						const isCompleted = Boolean(checkedResults[q.question_id]);
						const isActive = idx === activeQuestionIndex;
						let className = 'practice-progress-dash';
						if (isActive) className += ' is-active';
						else if (isCompleted) className += ' is-completed';
						return <div key={q.question_id} className={className} />;
					})}
				</div>
			</div>

			<section className="practice-layout">
				<article className="practice-main">
					<div className="practice-q-card">
						<p className="practice-q-meta">CÂU {activeQuestion.index} / {flatQuestions.length} &middot; PHẦN {activeQuestion.question.section} &middot; {TYPE_LABELS[activeQuestion.sectionType]}</p>
						<div className="practice-q-content">
							<MathText text={activeQuestion.question.content} />
						</div>

						{activeQuestion.sectionType === 'multiple_choice' && (
							<div className="practice-opts">
								{activeQuestion.question.options.map((opt, i) => {
									const label = OPTION_LABELS[i] || String(i);
									const isSelected = answers[activeQuestion.question_id] === label;
									let optClass = 'practice-opt';
									
									if (checkedCurrentQuestion) {
										if (checkedCurrentQuestion.correct_answer === label) {
											optClass += ' is-correct';
										} else if (isSelected && !checkedCurrentQuestion.is_correct) {
											optClass += ' is-wrong';
										}
									} else if (isSelected) {
										optClass += ' is-selected';
									}

									return (
										<button
											key={label}
											type="button"
											className={optClass}
											onClick={() => setAnswer(activeQuestion.question_id, label)}
											disabled={isCurrentQuestionLocked}
										>
											<span className="practice-opt-badge">{label}</span>
											<span className="practice-opt-text"><MathText text={opt.content} /></span>
										</button>
									);
								})}
							</div>
						)}

						{activeQuestion.sectionType === 'true_false' && (
							<div className="practice-tf">
								{activeQuestion.question.parts.map((part, index) => {
									const tokens = (answers[activeQuestion.question_id] ?? '').split(',');
									const current = tokens[index] ?? '';

									function pick(next: 'T' | 'F') {
										const clone = [...tokens];
										clone[index] = next;
										setAnswer(activeQuestion.question_id, clone.join(','));
									}

									return (
										<div key={part.label} className="practice-tf-row">
											<span className="practice-opt-badge">{part.label.toUpperCase()}</span>
											<span className="practice-tf-text"><MathText text={part.content} /></span>
											<button
												type="button"
												className={`practice-tf-pick ${current === 'T' ? 'is-selected' : ''}`}
												onClick={() => pick('T')}
												disabled={isCurrentQuestionLocked}
											>
												Đúng
											</button>
											<button
												type="button"
												className={`practice-tf-pick ${current === 'F' ? 'is-selected' : ''}`}
												onClick={() => pick('F')}
												disabled={isCurrentQuestionLocked}
											>
												Sai
											</button>
										</div>
									);
								})}
							</div>
						)}

						{activeQuestion.sectionType === 'short_answer' && (
							<div className="practice-short">
								<input
									type="text"
									placeholder="Nhập đáp án"
									value={answers[activeQuestion.question_id] ?? ''}
									onChange={(event) => setAnswer(activeQuestion.question_id, event.target.value)}
									disabled={isCurrentQuestionLocked}
								/>
							</div>
						)}

						<div className="practice-q-footer">
							<div className="practice-q-timer">
								⏱ {formattedRemainingTime}
							</div>
							<button 
								type="button" 
								className="practice-btn-confirm"
								onClick={handleCheckCurrentQuestion}
								disabled={isCurrentQuestionLocked || !answers[activeQuestion.question_id] || checkingQuestionId === activeQuestion.question_id}
							>
								{checkingQuestionId === activeQuestion.question_id ? 'Đang kiểm tra...' : 'Xác nhận đáp án'}
							</button>
						</div>

						{(!activeHintObj && !loadingHintQuestionId) && (
							<div className="practice-hint-tab" onClick={handleAskHint}>
								GỢI Ý
							</div>
						)}
					</div>
				</article>

				<aside className="practice-sidebar">
					<div className="practice-hints-card">
						<h3 className="practice-hints-title">GỢI Ý THEO CẤP ĐỘ</h3>
						{activeHintObj ? (
							<div className="practice-hint-list">
								<div className="practice-hint-item">
									<strong>1.</strong> {activeHintObj.hints?.hint_1 || activeHintObj.feedback}
								</div>
								<div className="practice-hint-item is-locked">
									<strong>2.</strong> 🔒 Xem sau khi thử gợi ý 1
								</div>
								<div className="practice-hint-item is-locked">
									<strong>3.</strong> 🔒 Lời giải rút gọn
								</div>
							</div>
						) : (
							<div className="practice-hint-item is-locked" onClick={handleAskHint}>
								{loadingHintQuestionId === activeQuestion.question_id ? 'Đang tải gợi ý...' : 'Bấm vào tab GỢI Ý để xem trợ giúp'}
							</div>
						)}
					</div>

					<div className="practice-nav-card">
						<h3 className="practice-nav-title">Danh sách câu hỏi</h3>
						{sections.map((section) => (
							<div key={section.label} className="practice-q-section">
								<p className="practice-q-section-label">{section.label}</p>
								<div className="practice-q-grid">
									{section.items.map(({ question, index }) => {
										const answered = Boolean(answers[question.question_id]);
										const checkedResult = checkedResults[question.question_id];
										const active = index === activeQuestionIndex;

										let stateClass = '';
										if (checkedResult) {
											stateClass = checkedResult.is_correct ? 'is-correct' : 'is-wrong';
										} else if (answered) {
											stateClass = 'is-answered';
										}

										return (
											<button
												key={question.question_id}
												className={`practice-q-dot ${stateClass} ${active ? 'is-active' : ''}`}
												onClick={() => setActiveQuestionIndex(index)}
											>
												{question.index}
											</button>
										);
									})}
								</div>
							</div>
						))}

						<div className="practice-q-actions">
							<button 
								className="practice-btn-nav" 
								disabled={activeQuestionIndex === 0}
								onClick={() => setActiveQuestionIndex(prev => Math.max(0, prev - 1))}
							>
								Quay lại
							</button>
							<button 
								className="practice-btn-nav"
								disabled={activeQuestionIndex === flatQuestions.length - 1}
								onClick={() => setActiveQuestionIndex(prev => Math.min(flatQuestions.length - 1, prev + 1))}
							>
								Tiếp theo
							</button>
						</div>
					</div>
				</aside>
			</section>
		</main>
	);
}
