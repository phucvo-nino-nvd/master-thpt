'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { useAccount } from '@/components/account-provider';
import { AnswerPayload, ChatMessage, ExamQuestion, streamChat } from '@/shared/api/client';
import { getApiErrorMessage } from '@/shared/api/error-message';
import { MathText } from './components/math-text';
import s from './tutor.module.css';

let lastModel = '';

const PRESETS = [
	['Giải thích lại', 'Giải thích lại câu này theo cách dễ hiểu hơn giúp em.'],
	['Soi lời giải', 'Soi bài làm của em, em sai hoặc thiếu ở bước nào?'],
	['Lý thuyết', 'Câu này dùng kiến thức lý thuyết nào, nhắc lại giúp em.'],
	['Câu tương tự', 'Cho em một câu tương tự để luyện thêm.'],
];

type TutorProps = {
	question: ExamQuestion;
	number: number;
	answer?: AnswerPayload;
	thread: ChatMessage[];
	onThread: (thread: ChatMessage[]) => void;
	onClose: () => void;
};

export function Tutor({ question, number, answer, thread, onThread, onClose }: TutorProps) {
	const { name } = useAccount();
	const [draft, setDraft] = useState('');
	const [reply, setReply] = useState<string | null>(null);
	const [error, setError] = useState('');
	const [model, setModel] = useState(lastModel);
	const body = useRef<HTMLDivElement>(null);
	const stick = useRef(true);
	const label = String(number).padStart(2, '0');

	useEffect(() => {
		if (stick.current) body.current?.scrollTo({ top: body.current.scrollHeight });
	}, [thread, reply]);

	useEffect(() => {
		const escape = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
		document.addEventListener('keydown', escape);
		return () => document.removeEventListener('keydown', escape);
	}, [onClose]);

	const send = async (raw: string) => {
		const message = raw.trim();
		if (!message || reply !== null) return;
		const asked: ChatMessage[] = [...thread, { role: 'user', content: message }];
		let text = '';
		stick.current = true;
		onThread(asked);
		setDraft('');
		setError('');
		setReply('');
		try {
			await streamChat({ message, history: thread, question_id: question.id, student_answer: answer }, (chunk) => {
				text += chunk;
				setReply(text);
			}, (name) => {
				lastModel = name;
				setModel(name);
			});
			onThread([...asked, { role: 'assistant', content: text }]);
		} catch (failure) {
			setError(getApiErrorMessage(failure, 'Trợ lý chưa trả lời được.'));
			onThread(thread);
			setDraft(message);
		} finally {
			setReply(null);
		}
	};

	const submit = (event: FormEvent) => {
		event.preventDefault();
		void send(draft);
	};

	return (
		<div className={s.backdrop} onClick={onClose}>
			<section className={s.sheet} role="dialog" aria-modal="true" aria-labelledby="tutor-title" onClick={(event) => event.stopPropagation()}>
				<header className={s.head}>
					<h2 id="tutor-title">Hỏi trợ lý về câu {label}</h2>
					<button type="button" className={s.close} onClick={onClose} aria-label="Đóng">
						✕
					</button>
				</header>

				<div
					ref={body}
					className={s.body}
					onScroll={(event) => {
						const el = event.currentTarget;
						stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
					}}
				>
					<div className={s.seed}>
						Em đang hỏi về <strong>Câu {label}</strong>: <MathText text={question.content} />
						{[...question.options, ...question.parts].map((choice, i) => (
							<div key={choice.label} className={`${s.choice} ${answer === choice.label ? s.picked : ''}`}>
								<b>{choice.label}</b>
								<span>
									<MathText text={choice.content} />
								</span>
								{Array.isArray(answer) && answer[i] !== undefined && <em>Em chọn: {answer[i] ? 'Đúng' : 'Sai'}</em>}
							</div>
						))}
					</div>
					{thread.map((message, i) => (
						<Message key={i} message={message} name={name} />
					))}
					{reply ? (
						<Message message={{ role: 'assistant', content: reply }} name={name} />
					) : (
						reply === '' && (
							<div className={s.typing}>
								<span className={s.dots} aria-hidden="true">
									<i />
									<i />
									<i />
								</span>
								Trợ lý đang soi lại bước giải của em
							</div>
						)
					)}
					{error && <div className={s.error}>{error}</div>}
				</div>

				<form className={s.foot} onSubmit={submit}>
					<div className={s.pills}>
						{PRESETS.map(([title, message]) => (
							<button key={title} type="button" className={s.pill} disabled={reply !== null} onClick={() => void send(message)}>
								{title}
							</button>
						))}
					</div>
					<div className={s.compose}>
						<textarea
							className={s.input}
							rows={1}
							value={draft}
							placeholder="Hỏi thêm về câu hỏi này…"
							onChange={(event) => setDraft(event.target.value)}
							onKeyDown={(event) => {
								if (event.key === 'Enter' && !event.shiftKey) submit(event);
							}}
						/>
						{model && (
							<span className={s.model} title="Model đang trả lời">
								{model.split('/').pop()}
							</span>
						)}
						<button type="submit" className={s.send} disabled={!draft.trim() || reply !== null}>
							GỬI
						</button>
					</div>
				</form>
			</section>
		</div>
	);
}

function Message({ message, name }: { message: ChatMessage; name: string }) {
	const student = message.role === 'user';
	return (
		<div className={`${s.msg} ${student ? s.student : s.ai}`}>
			<span className={s.who}>{student ? name || 'Em' : 'Trợ lý'}</span>
			<div className={s.text}>{student ? message.content : <MathText text={message.content} />}</div>
		</div>
	);
}
