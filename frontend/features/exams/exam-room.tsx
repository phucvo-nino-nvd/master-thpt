'use client';

import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useAccount } from '@/components/account-provider';
import { useProcessing } from '@/components/processing-provider';
import { ChecklistIcon, ChevronLeftIcon, LogoutIcon } from '@/components/icons';
import page from '@/components/page.module.css';
import { score } from '@/lib/format';
import { ATTEMPT_KEY, writePending } from '@/lib/pending';
import { questResultHref } from '@/lib/quest';
import {
	ChatMessage,
	Evaluation,
	Exam,
	ExamQuestion,
	HistoryDetail,
	HistoryMode,
	MAX_HINT_LEVEL,
	MOCK_ACCOUNT,
	SubmitExamResponse,
	askHint,
	askSolution,
	checkQuestion,
	createHistory,
} from '@/shared/api/client';
import { getApiErrorMessage } from '@/shared/api/error-message';
import { MathInline, MathText } from './components/math-text';
import { AnswerValue, isAnswered, isCorrect, toApiAnswer } from './lib/helpers';
import { Tutor } from './tutor';
import { Plans } from '@/components/plans';
import s from './exam-room.module.css';

const PRACTICE_MODES: HistoryMode[] = ['review', 'practice'];
export const QUEST_MODES: HistoryMode[] = ['checkpoint', 'obstacle', 'placement', 'skip'];
const TAGS: Record<HistoryMode, string> = {
	exam: 'Đề thi',
	practice: 'Tự luyện',
	review: 'Nhiệm vụ hôm nay',
	checkpoint: 'Vượt trạm',
	obstacle: 'Gỡ bom',
	placement: 'Xác định trình độ',
	skip: 'Vượt cấp',
};

const clock = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

function optionTone(question: ExamQuestion, label: string, answer: AnswerValue | undefined, evaluation?: Evaluation) {
	if (evaluation && label === question.answer) return s.right;
	if (answer === label) return evaluation ? s.wrong : s.selected;
	return '';
}

type ExamRoomProps = { exam: Exam; mode: HistoryMode; review?: HistoryDetail; retake?: boolean };

export function ExamRoom({ exam, mode, review, retake }: ExamRoomProps) {
	const router = useRouter();
	const { account, reload } = useAccount();
	const { submit: submitExam } = useProcessing();
	const { isSignedIn } = useAuth();
	const guest = !isSignedIn && !MOCK_ACCOUNT;
	const questions = exam.questions;
	const last = questions.length - 1;
	const readOnly = !!review;
	const practice = !readOnly && PRACTICE_MODES.includes(mode);
	const [index, setIndex] = useState(0);
	const [answers, setAnswers] = useState<Record<string, AnswerValue>>(() =>
		Object.fromEntries(review?.questions.map((entry) => [entry.question_id, entry.student_answer]) ?? []),
	);
	const [checked, setChecked] = useState<Record<string, Evaluation>>(() =>
		Object.fromEntries(review?.questions.map((entry) => [entry.question_id, entry.evaluation]) ?? []),
	);
	const [flags, setFlags] = useState<Record<string, boolean>>({});
	const [hints, setHints] = useState<Record<string, string[]>>({});
	const [solutions, setSolutions] = useState<Record<string, string>>({});
	const [threads, setThreads] = useState<Record<string, ChatMessage[]>>({});
	const [tutorOpen, setTutorOpen] = useState(false);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState('');
	const [result, setResult] = useState<SubmitExamResponse | null>(null);
	const [confirmation, setConfirmation] = useState<'leave' | 'submit' | null>(null);
	const confirmationDialog = useRef<HTMLDialogElement>(null);
	const historyId = useRef(review?.history_id ?? null);
	const startedAt = useRef(Date.now());
	const [now, setNow] = useState(Date.now());

	const question = questions[index];
	const answer = answers[question.id];
	const evaluation = checked[question.id];
	const elapsed = Math.floor((now - startedAt.current) / 1000);
	const limit = exam.duration_minutes * 60;
	const remaining = limit ? Math.max(0, limit - elapsed) : null;
	const answeredCount = questions.filter((entry) => isAnswered(answers[entry.id])).length;
	const hintLevel = hints[question.id]?.length ?? 0;

	const run = async (task: () => Promise<void>, fallback: string) => {
		setBusy(true);
		setError('');
		try {
			await task();
		} catch (failure) {
			setError(getApiErrorMessage(failure, fallback));
		} finally {
			setBusy(false);
		}
	};

	const confirmSubmit = () => {
		if (busy) return;
		if (answeredCount === questions.length) void submit();
		else setConfirmation('submit');
	};

	const leave = () => {
		if (busy) return;
		if (readOnly || result || !answeredCount) router.back();
		else setConfirmation('leave');
	};

	useEffect(() => {
		const dialog = confirmationDialog.current;
		if (confirmation && !busy && !result) dialog?.showModal();
		else {
			dialog?.close();
			if (confirmation) setConfirmation(null);
		}
	}, [confirmation, busy, result]);

	const submit = () =>
		run(async () => {
			const body = {
				exam_id: exam.exam_id,
				answers: questions.map((entry) => ({ question_id: entry.id, student_answer: toApiAnswer(answers[entry.id] ?? '') })),
				duration_seconds: Math.floor((Date.now() - startedAt.current) / 1000),
				mode,
			};
			if (guest && QUEST_MODES.includes(mode)) {
				writePending(ATTEMPT_KEY, body);
				const wrong = questions.filter((entry, i) => !isCorrect(entry, body.answers[i].student_answer));
				const start = mode === 'placement' ? `&start=${encodeURIComponent(wrong[0]?.station ?? '')}` : '';
				router.push(`/onboarding?step=streak&correct=${questions.length - wrong.length}&total=${questions.length}${start}`);
				return;
			}
			const response = await submitExam(body);
			reload();
			if (QUEST_MODES.includes(mode)) {
				router.push(questResultHref(exam.exam_id, response.correct_count, questions.length, retake));
			} else {
				setResult(response);
			}
		}, 'Chưa nộp được bài. Thử lại nha.');

	useEffect(() => {
		if (readOnly) return;
		const timer = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(timer);
	}, [readOnly]);

	useEffect(() => {
		if (remaining === 0 && !practice && !result && !busy) void submit();
	}, [remaining === 0, busy]);

	const setAnswer = (value: AnswerValue) => setAnswers((prev) => ({ ...prev, [question.id]: value }));

	const setPart = (part: number, value: boolean) => {
		const parts = Array.isArray(answer) ? [...answer] : question.parts.map(() => null);
		parts[part] = value;
		setAnswer(parts);
	};

	const check = () =>
		run(async () => {
			historyId.current ??= (await createHistory(exam.exam_id, mode)).history_id;
			const verdict = await checkQuestion(historyId.current, question.id, toApiAnswer(answer));
			setChecked((prev) => ({ ...prev, [question.id]: verdict }));
			reload();
		}, 'Chưa kiểm tra được câu này.');

	const hint = () =>
		run(async () => {
			const id = question.id;
			let text = '';
			const write = (value?: string) => setHints((prev) => ({ ...prev, [id]: [...(prev[id] ?? []).slice(0, hintLevel), ...(value === undefined ? [] : [value])] }));
			write('');
			try {
				await askHint(id, hintLevel + 1, answer === undefined ? undefined : toApiAnswer(answer), (chunk) => write((text += chunk)));
			} catch (failure) {
				write();
				throw failure;
			}
		}, 'Chưa lấy được gợi ý.');

	const solve = () =>
		run(async () => {
			if (!historyId.current) return;
			const id = question.id;
			let text = '';
			try {
				await askSolution(historyId.current, id, (chunk) => {
					text += chunk;
					setSolutions((prev) => ({ ...prev, [id]: text }));
				});
			} catch (failure) {
				setSolutions(({ [id]: _, ...rest }) => rest);
				throw failure;
			}
		}, 'Chưa lấy được lời giải.');

	const next = () => setIndex((i) => Math.min(last, i + 1));

	const primary = readOnly
		? index < last
			? { label: 'Câu tiếp →', action: next }
			: { label: 'Về lịch sử', action: () => router.push('/history') }
		: practice
			? !evaluation
				? { label: 'KIỂM TRA', action: check, disabled: !isAnswered(answer) || busy }
				: index < last
					? { label: 'Câu tiếp →', action: next }
					: { label: 'Hoàn thành', action: () => router.push('/practice') }
			: index < last
				? { label: 'Câu tiếp →', action: next }
				: { label: 'Nộp bài', action: confirmSubmit, disabled: busy };

	return (
		<main className={s.main}>
			<div className={s.inner}>
				<header className={s.topbar}>
					<button type="button" className={s.back} onClick={leave} disabled={busy} aria-label="Quay lại">
						<ChevronLeftIcon size={20} strokeWidth={3} />
					</button>
					<div>
						<h1 className={s.title}><MathInline text={exam.title} /></h1>
						<div className={s.meta}>
							<span className={s.tag}>{TAGS[mode]}</span>
							<span>{questions.length} câu</span>
							{exam.duration_minutes > 0 && <span>{exam.duration_minutes} phút</span>}
						</div>
					</div>
				</header>

				<div className={s.progressRow}>
					<span className={s.progress}>
						<span style={{ width: `${(100 * answeredCount) / questions.length}%` }} />
					</span>
					<span className={s.progressCopy}>
						{answeredCount} / {questions.length} câu
					</span>
				</div>

				{error && <div className={`${page.error} ${s.error}`}>{error}</div>}

				<section className={s.layout}>
					<article className={s.question}>
						<div className={s.questionHead}>
							<div className={s.questionLabel}>
								<span className={s.questionNum}>{index + 1}</span>
								CÂU {index + 1} / {questions.length}
							</div>
							<div className={s.tools}>
								{!readOnly && (
									<button
										type="button"
										className={`${s.tool} ${flags[question.id] ? s.flagged : ''}`}
										onClick={() => setFlags((prev) => ({ ...prev, [question.id]: !prev[question.id] }))}
									>
										{flags[question.id] ? 'Bỏ đánh dấu' : 'Đánh dấu câu'}
									</button>
								)}
								{readOnly && (
									<button type="button" className={`${s.tool} ${s.ask}`} onClick={() => setTutorOpen(true)}>
										{account.plan === 'pro' ? 'Hỏi trợ lý' : 'Hỏi trợ lý · PRO'}
									</button>
								)}
								{evaluation && historyId.current ? (
									!solutions[question.id] && (
										<button type="button" className={`${s.tool} ${s.hint}`} onClick={solve} disabled={busy}>
											Xem lời giải
										</button>
									)
								) : (
									!readOnly &&
									!guest && (
										<button type="button" className={`${s.tool} ${s.hint}`} onClick={hint} disabled={busy || hintLevel >= MAX_HINT_LEVEL}>
											Gợi ý ({hintLevel}/{MAX_HINT_LEVEL})
										</button>
									)
								)}
							</div>
						</div>

						<div className={s.prompt}>
							<MathText text={question.content} />
						</div>

						{hintLevel > 0 && (
							<div className={s.hints}>
								{hints[question.id].map((text, i) => (
									<div key={i}>
										<strong>Gợi ý {i + 1}:</strong> <MathText text={text} />
									</div>
								))}
							</div>
						)}

						{question.type === 'multiple_choice' && (
							<div className={s.options}>
								{question.options.map((option) => {
									const tone = optionTone(question, option.label, answer, evaluation);
									return (
										<button
											key={option.label}
											type="button"
											disabled={readOnly || !!evaluation}
											className={`${s.option} ${tone}`}
											onClick={() => setAnswer(option.label)}
										>
											<span className={s.letter}>{option.label}</span>
											<span className={s.optionCopy}>
												<MathText text={option.content} />
											</span>
											{tone && <span className={s.mark}>{tone === s.wrong ? '✕' : '✓'}</span>}
										</button>
									);
								})}
							</div>
						)}

						{question.type === 'true_false' && (
							<div className={s.options}>
								{question.parts.map((part, i) => {
									const value = Array.isArray(answer) ? answer[i] : null;
									const tone = evaluation ? (evaluation.part_correct[i] ? s.right : s.wrong) : '';
									return (
										<div key={part.label} className={`${s.part} ${tone}`}>
											<div>
												<strong>{part.label})</strong> <MathText text={part.content} />
											</div>
											<div className={s.truth}>
												<button type="button" disabled={readOnly || !!evaluation} className={value === true ? s.yes : ''} onClick={() => setPart(i, true)}>
													Đúng
												</button>
												<button type="button" disabled={readOnly || !!evaluation} className={value === false ? s.no : ''} onClick={() => setPart(i, false)}>
													Sai
												</button>
											</div>
										</div>
									);
								})}
							</div>
						)}

						{question.type === 'short_answer' && (
							<input
								className={s.short}
								value={typeof answer === 'string' ? answer : ''}
								disabled={readOnly || !!evaluation}
								onChange={(event) => setAnswer(event.target.value)}
								placeholder="Điền đáp số của em…"
							/>
						)}

						{evaluation && (
							<div className={`${s.feedback} ${evaluation.correct ? '' : s.miss}`}>
								<MathText text={evaluation.feedback || (evaluation.correct ? 'Chính xác!' : 'Chưa đúng.')} />
							</div>
						)}

						{solutions[question.id] && (
							<div className={s.solution}>
								<MathText text={solutions[question.id]} />
							</div>
						)}

						<div className={s.foot}>
							<button type="button" className={s.secondary} disabled={index === 0} onClick={() => setIndex(index - 1)}>
								← Câu trước
							</button>
							<button type="button" className={s.primary} disabled={primary.disabled} onClick={primary.action}>
								{primary.label}
							</button>
						</div>
					</article>

					<aside className={s.side}>
						<div className={s.timer}>
							<p className={s.timerLabel}>{review ? 'THỜI GIAN LÀM' : remaining !== null ? 'THỜI GIAN CÒN LẠI' : 'THỜI GIAN'}</p>
							<p className={s.timerValue}>
								{review ? (review.duration_seconds === null ? '--:--' : clock(review.duration_seconds)) : clock(remaining ?? elapsed)}
							</p>
							<p className={s.timerNote}>
								{review ? `Đúng ${review.correct_count}/${review.total_questions} câu` : 'Cố lên, em đang làm rất ổn!'}
							</p>
						</div>

						<div className={s.navigator}>
							<div className={s.navTitle}>
								Danh sách câu
								<span className={s.navCount}>{answeredCount} đã làm</span>
							</div>
							<div className={s.grid}>
								{questions.map((entry, i) => {
									const verdict = checked[entry.id];
									const tone =
										i === index
											? s.current
											: verdict
												? verdict.correct
													? s.right
													: s.wrong
												: flags[entry.id]
													? s.flagged
													: isAnswered(answers[entry.id])
														? s.answered
														: '';
									return (
										<button key={entry.id} type="button" className={`${s.cell} ${tone}`} onClick={() => setIndex(i)}>
											{String(i + 1).padStart(2, '0')}
										</button>
									);
								})}
							</div>
							<div className={s.legend}>
								<span>
									<i className={s.cur} />
									Đang làm
								</span>
								<span>
									<i />
									{readOnly || practice ? 'Đúng' : 'Đã trả lời'}
								</span>
								<span>
									<i className={s.flag} />
									{readOnly || practice ? 'Sai' : 'Cần xem lại'}
								</span>
							</div>
						</div>

						{readOnly ? (
							<Link href="/history" className={s.submit}>
								VỀ LỊCH SỬ
							</Link>
						) : practice ? (
							<Link href="/practice" className={s.submit}>
								KẾT THÚC LUYỆN TẬP
							</Link>
						) : (
							<button type="button" className={s.submit} disabled={busy} onClick={confirmSubmit}>
								{busy ? 'ĐANG CHẤM BÀI...' : 'NỘP BÀI & CHẤM NGAY'}
							</button>
						)}

						<div className={s.note}>
							<strong>Mẹo nhỏ:</strong> Câu khó có thể bỏ qua và quay lại sau. Đừng để một câu giữ chân em quá lâu nhé.
						</div>
					</aside>
				</section>
			</div>

			<dialog ref={confirmationDialog} className={s.confirmDialog} aria-labelledby="exam-confirm-title" aria-describedby="exam-confirm-copy" onCancel={() => setConfirmation(null)} onClose={() => setConfirmation(null)}>
				<div className={s.confirmIcon}>{confirmation === 'submit' ? <ChecklistIcon size={24} /> : <LogoutIcon size={24} />}</div>
				<h2 id="exam-confirm-title">{confirmation === 'submit' ? 'Nộp bài luôn nhé?' : 'Thoát bài làm?'}</h2>
				<p id="exam-confirm-copy">{confirmation === 'submit' ? `Em còn ${questions.length - answeredCount} câu chưa trả lời. Em có thể quay lại làm tiếp trước khi nộp.` : 'Câu trả lời hiện tại sẽ không được lưu. Em muốn tiếp tục làm bài chứ?'}</p>
				<div className={s.confirmActions}>
					<button type="button" className={s.primary} autoFocus onClick={() => setConfirmation(null)}>Làm tiếp</button>
					<button type="button" className={s.secondary} disabled={busy} onClick={() => {
						const action = confirmation;
						setConfirmation(null);
						if (action === 'submit') void submit();
						else if (action === 'leave') router.back();
					}}>{confirmation === 'submit' ? 'Nộp bài' : 'Thoát bài'}</button>
				</div>
			</dialog>

			{result && (
				<div className={s.overlay}>
					<div className={s.result}>
						<div className={s.resultKicker}>NỘP BÀI XONG</div>
						<div className={s.resultScore}>
							{score(result.total_score)}
							<small>/10</small>
						</div>
						<p className={s.resultCopy}>
							Đúng {result.correct_count}/{questions.length} câu.
						</p>
						<div className={s.resultActions}>
							<Link href={`/history/${result.history_id}`} className={s.submit}>
								XEM LẠI BÀI
							</Link>
							<Link href="/documents" className={s.secondary}>
								Về kho đề
							</Link>
						</div>
					</div>
				</div>
			)}
			{tutorOpen && account.plan !== 'pro' && (
				<div className={s.planOverlay} onClick={() => setTutorOpen(false)}>
					<div className={s.planSheet} role="dialog" aria-modal="true" aria-labelledby="plan-title" onClick={(event) => event.stopPropagation()}>
						<div className={s.planHead}>
							<h2 id="plan-title">Hỏi trợ lý dành cho gói Pro</h2>
							<button type="button" className={s.planClose} onClick={() => setTutorOpen(false)} aria-label="Đóng">
								✕
							</button>
						</div>
						<Plans run={(task) => run(task, 'Chưa đổi được gói.')} onCheckout={() => setTutorOpen(false)} />
					</div>
				</div>
			)}
			{tutorOpen && account.plan === 'pro' && (
				<Tutor
					question={question}
					number={index + 1}
					answer={answer === undefined ? undefined : toApiAnswer(answer)}
					thread={threads[question.id] ?? []}
					onThread={(thread) => setThreads((prev) => ({ ...prev, [question.id]: thread }))}
					onClose={() => setTutorOpen(false)}
				/>
			)}
		</main>
	);
}
