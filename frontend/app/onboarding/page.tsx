'use client';

import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useAccount } from '@/components/account-provider';
import { useProcessing } from '@/components/processing-provider';
import { CheckIcon, ChevronLeftIcon } from '@/components/icons';
import { Rive } from '@/components/rive';
import { ANSWERS_KEY, ATTEMPT_KEY, readPending, writePending } from '@/lib/pending';
import { questResultHref } from '@/lib/quest';
import { MOCK_ACCOUNT, SubmitExamBody, startPath } from '@/shared/api/client';
import s from './onboarding.module.css';

const STEPS = ['welcome', 'source', 'grade', 'goal', 'time', 'start', 'loading', 'save', 'done'] as const;
const QUESTIONS = ['source', 'grade', 'goal', 'time', 'start'] as const;
const LOAD_START_MS = 60;
const LOADING_MS = 2400;
const DEFAULTS = { grade: '12', goal: '8', time: '20' };

type Step = (typeof STEPS)[number];
type Question = (typeof QUESTIONS)[number];
type Answers = Partial<Record<Question, string>>;
type Choice = { id: string; title: string; right?: string; sub?: string };

const ASK: Record<Question, string> = {
	source: 'Em biết tới MASTER THPT qua đâu?',
	grade: 'Em đang học lớp mấy?',
	goal: 'Mục tiêu điểm Toán của em là bao nhiêu?',
	time: 'Mỗi ngày em học được bao lâu?',
	start: 'Giờ mình bắt đầu từ đâu nè?',
};

const CHOICES: Record<Question, Choice[]> = {
	source: [
		{ id: 'tt', title: 'TikTok' },
		{ id: 'fb', title: 'Facebook' },
		{ id: 'yt', title: 'YouTube' },
		{ id: 'ban', title: 'Bạn bè rủ' },
		{ id: 'thay', title: 'Thầy cô, trường' },
	],
	grade: [
		{ id: '10', title: 'Lớp 10', right: 'Mới vào cấp 3' },
		{ id: '11', title: 'Lớp 11', right: 'Đang giữa chặng' },
		{ id: '12', title: 'Lớp 12', right: 'Năm thi tốt nghiệp' },
	],
	goal: [
		{ id: '6', title: '6+ điểm', right: 'Đủ đỗ' },
		{ id: '7', title: '7+ điểm', right: 'Khá' },
		{ id: '8', title: '8+ điểm', right: 'Giỏi' },
		{ id: '9', title: '9+ điểm', right: 'Thủ khoa' },
	],
	time: [
		{ id: '10', title: '10 phút / ngày', right: 'Thong thả' },
		{ id: '20', title: '20 phút / ngày', right: 'Vừa sức' },
		{ id: '30', title: '30 phút / ngày', right: 'Nghiêm túc' },
		{ id: '45', title: '45 phút / ngày', right: 'Chiến thần' },
	],
	start: [
		{ id: 'path', title: 'Học từ đầu lộ trình', sub: 'Bắt đầu ở Trạm 1 của khối, đi lần lượt từng trạm.' },
		{ id: 'mock', title: 'Xác định trình độ', sub: 'Vài câu ngắn. Làm tốt thì nhảy thẳng tới trạm hợp sức.' },
	],
};

const REPLY: Record<Question, (value: string) => string> = {
	source: () => 'Ok, cảm ơn nha!',
	grade: (value) => (value === '12' ? 'Năm cuối rồi, mình chạy nhanh nha.' : 'Còn kịp xây nền chắc.'),
	goal: (value) => (value === '9' ? 'Tham vọng đó, thích!' : 'Mục tiêu rõ ràng, ổn áp.'),
	time: (value) => `${value} phút mỗi ngày, chốt.`,
	start: (value) => (value === 'path' ? 'Đi từ Trạm 1 nha.' : 'Làm vài câu để mình xếp trạm cho em.'),
};

const SOURCE_ICONS: Record<string, ReactNode> = {
	tt: (
		<svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
			<rect width="40" height="40" rx="11" fill="#111319" />
			<g fill="none" strokeWidth="3.4" strokeLinecap="round">
				<path d="M22.5 10v14.2a4.7 4.7 0 1 1-4.7-4.7M22.5 10c.6 3.4 2.8 5.6 6.2 6" stroke="#25F4EE" transform="translate(-1.2 -1)" />
				<path d="M22.5 10v14.2a4.7 4.7 0 1 1-4.7-4.7M22.5 10c.6 3.4 2.8 5.6 6.2 6" stroke="#FE2C55" transform="translate(1.2 1)" />
				<path d="M22.5 10v14.2a4.7 4.7 0 1 1-4.7-4.7M22.5 10c.6 3.4 2.8 5.6 6.2 6" stroke="#fff" />
			</g>
		</svg>
	),
	fb: (
		<svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
			<circle cx="20" cy="20" r="20" fill="#1877F2" />
			<path d="M22.2 32V21.6h3.4l.5-4h-3.9v-2.5c0-1.2.3-1.9 2-1.9h2.1V9.6a28 28 0 0 0-3-.2c-3 0-5.1 1.8-5.1 5.2v3h-3.4v4h3.4V32z" fill="#fff" />
		</svg>
	),
	yt: (
		<svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
			<rect x="2" y="8" width="36" height="24" rx="8" fill="#FF0033" />
			<path d="M17 14.5v11l9-5.5z" fill="#fff" />
		</svg>
	),
	ban: (
		<svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
			<rect width="40" height="40" rx="11" fill="#FFF3C4" />
			<circle cx="15" cy="15" r="5" fill="#FFB21E" />
			<path d="M6 31c0-5 4-8.5 9-8.5s9 3.5 9 8.5z" fill="#FFB21E" />
			<circle cx="26.5" cy="16.5" r="4.3" fill="#F2542D" />
			<path d="M19.5 31c.4-4.3 3.3-7 7-7s6.6 2.7 7 7z" fill="#F2542D" />
		</svg>
	),
	thay: (
		<svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
			<rect width="40" height="40" rx="11" fill="#ECECFF" />
			<path d="M20 10L5 17l15 7 15-7z" fill="#4A48E8" />
			<path d="M11 20.5v6c0 2 4 4 9 4s9-2 9-4v-6l-9 4.2z" fill="#3230B8" />
			<path d="M33 17.5v7" stroke="#4A48E8" strokeWidth="2" strokeLinecap="round" />
			<circle cx="33" cy="25.5" r="1.8" fill="#A8DC2C" />
		</svg>
	),
};

const isQuestion = (step: Step): step is Question => (QUESTIONS as readonly string[]).includes(step);
const RESUMABLE: readonly string[] = ['save', 'done'];

export default function OnboardingPage({ searchParams }: { searchParams: { step?: string } }) {
	const router = useRouter();
	const { isLoaded, isSignedIn } = useAuth();
	const { name, save, reload } = useAccount();
	const { submit: submitExam } = useProcessing();
	const [index, setIndex] = useState(RESUMABLE.includes(searchParams.step ?? '') ? STEPS.indexOf(searchParams.step as Step) : 0);
	const [answers, setAnswers] = useState<Answers>({});
	const [loaded, setLoaded] = useState(false);
	const [resultHref, setResultHref] = useState('');
	const finished = useRef(false);
	const step = STEPS[index];
	const signedIn = isSignedIn || MOCK_ACCOUNT;
	const plan = { ...DEFAULTS, ...answers };
	const go = (delta: number) => setIndex((i) => Math.max(0, Math.min(STEPS.length - 1, i + delta)));

	useEffect(() => {
		if (RESUMABLE.includes(searchParams.step ?? '')) setAnswers(readPending<Answers>(ANSWERS_KEY) ?? {});
	}, []);

	useEffect(() => {
		if (step !== 'loading') return;
		const fill = setTimeout(() => setLoaded(true), LOAD_START_MS);
		const next = setTimeout(() => {
			writePending(ANSWERS_KEY, answers);
			if (signedIn) go(1);
			else router.push(`/exams/guest?mode=${answers.start === 'mock' ? 'placement' : 'checkpoint'}`);
		}, LOADING_MS);
		return () => {
			clearTimeout(fill);
			clearTimeout(next);
			setLoaded(false);
		};
	}, [step, signedIn]);

	useEffect(() => {
		if (step !== 'done' || !isLoaded) return;
		const pending = readPending<Answers>(ANSWERS_KEY) ?? {};
		const attempt = readPending<SubmitExamBody>(ATTEMPT_KEY);
		setAnswers(pending);
		if (!pending.grade || !signedIn || finished.current) return;
		finished.current = true;
		save({ grade: Number(pending.grade), goal: Number(pending.goal), settings: { minutes: Number(pending.time) } })
			.catch(() => {})
			.then(() => (pending.start === 'path' ? startPath(Number(pending.grade)) : null))
			.then(() => (attempt ? submitExam(attempt) : null))
			.then((response) => {
				localStorage.removeItem(ANSWERS_KEY);
				localStorage.removeItem(ATTEMPT_KEY);
				if (attempt && response) setResultHref(questResultHref(attempt.exam_id, response.correct_count, attempt.answers.length));
				reload();
			})
			.catch(() => {});
	}, [step, isLoaded, signedIn]);

	const createProfile = () => {
		writePending(ANSWERS_KEY, answers);
		if (signedIn) go(1);
		else router.push(`/sign-up?redirect_url=${encodeURIComponent('/onboarding?step=done')}`);
	};

	const selected = isQuestion(step) ? answers[step] : undefined;
	const gated = isQuestion(step) && !selected;
	const questionIndex = isQuestion(step) ? QUESTIONS.indexOf(step) : -1;
	const recommendMock = !!answers.grade && answers.grade !== '10';
	const firstName = name.split(' ').pop();
	const startLabel = plan.start === 'mock' ? 'bài xác định trình độ' : 'Trạm 1';

	return (
		<div className={s.screen}>
			{isQuestion(step) && (
				<header className={s.bar}>
					<button type="button" className={s.icon} title="Quay lại" onClick={() => go(-1)}>
						<ChevronLeftIcon />
					</button>
					<div className={s.track}>
						<span style={{ width: `${(100 * Math.max(0, questionIndex + (selected ? 1 : 0))) / QUESTIONS.length}%` }} />
					</div>
				</header>
			)}

			{step === 'welcome' && (
				<>
					<div className={s.brandRow}>
						<div className={s.brand}>
							<span className={s.mark}>M</span>MASTER THPT
						</div>
						<span className={s.subject}>MÔN TOÁN · LỚP 10–12</span>
					</div>
					<div className={s.welcome}>
						<div className={s.mascot}>
							<Rive src="mascot_hello" knockout fit="cover" fireonload trigger="clic salut|welcome" bool="detect mouse=true" />
						</div>
						<div className={s.welcomeCopy}>
							<h1 className={s.headline}>Học Toán THPT kiểu mỗi ngày một chút, mà vẫn chắc tay ngày thi.</h1>
							<div className={s.stack}>
								<button type="button" className={s.lime} onClick={() => go(1)}>
									BẮT ĐẦU NGAY
								</button>
								<Link href={`/sign-in?redirect_url=${encodeURIComponent('/today')}`} className={s.outline}>
									MÌNH ĐÃ CÓ TÀI KHOẢN
								</Link>
							</div>
						</div>
					</div>
				</>
			)}

			{isQuestion(step) && (
				<div className={s.question}>
					<div className={s.talk}>
						<div className={`${s.mascot} ${s.small}`}>
							<Rive src="mascot_hello" knockout fit="cover" fireonload trigger={`clic salut|${step}`} />
						</div>
						<div className={s.ask}>{ASK[step]}</div>
					</div>
					<div className={s.choices}>
						<div className={`${s.list} ${step === 'start' ? s.wide : ''}`}>
							{CHOICES[step].map((choice) => (
								<button
									key={choice.id}
									type="button"
									className={`${s.choice} ${selected === choice.id ? s.on : ''}`}
									onClick={() => setAnswers({ ...answers, [step]: choice.id })}
								>
									{step === 'source' && SOURCE_ICONS[choice.id]}
									{step === 'start' && <span className={`${s.glyph} ${s[choice.id]}`}>{choice.id === 'path' ? '1' : '?'}</span>}
									<span className={s.choiceText}>
										{choice.title}
										{choice.sub && <small>{choice.sub}</small>}
									</span>
									{choice.right && <span className={s.right}>{choice.right}</span>}
									{step === 'start' && (choice.id === 'mock') === recommendMock && <span className={s.badge}>GỢI Ý CHO EM</span>}
								</button>
							))}
						</div>
					</div>
				</div>
			)}

			{step === 'loading' && (
				<div className={s.center}>
					<picture className={s.loadingArt}>
						<source media="(prefers-reduced-motion: reduce)" srcSet="/illustrations/roadmap-camel-still.jpg" />
						<img src="/illustrations/roadmap-camel.gif" alt="" width={800} height={600} />
					</picture>
					<div className={s.loadingTitle}>Đang xếp lộ trình Lớp {plan.grade} cho em…</div>
					<div className={s.loadTrack}>
						<span style={{ width: loaded ? '100%' : '0%' }} />
					</div>
					<div className={s.chips}>
						<span className={s.chip}>Lớp {plan.grade}</span>
						<span className={s.chip}>Mục tiêu {plan.goal}+</span>
						<span className={s.chip}>{plan.time} phút / ngày</span>
					</div>
				</div>
			)}

			{step === 'save' && (
				<div className={s.center}>
					<div className={s.talk}>
						<div className={`${s.mascot} ${s.medium}`}>
							<Rive src="mascot_hello" knockout fit="cover" fireonload trigger="clic salut|save" />
						</div>
						<div className={s.bubble}>
							<div className={s.say}>Tạo hồ sơ để giữ lộ trình nha!</div>
							<div className={s.sayNote}>Có hồ sơ là lửa, XP và tiến độ được lưu lại.</div>
						</div>
					</div>
					<div className={s.checklist}>
						{[`Lộ trình Lớp ${plan.grade} · mục tiêu ${plan.goal}+`, `${plan.time} phút mỗi ngày`, `Bắt đầu từ ${startLabel}`].map((line) => (
							<div key={line} className={s.checkRow}>
								<span className={s.tick}>
									<CheckIcon size={13} strokeWidth={4} />
								</span>
								{line}
							</div>
						))}
					</div>
				</div>
			)}

			{step === 'done' && (
				<div className={s.center}>
					<div className={s.mascot}>
						<Rive src="mascot_hello" knockout fit="cover" fireonload trigger="clic salut|done" />
					</div>
					<h1 className={s.doneTitle}>Chào mừng {firstName} vào lớp!</h1>
					<p className={s.doneCopy}>
						Lớp {plan.grade} · mục tiêu {plan.goal}+ · {plan.time} phút mỗi ngày
					</p>
					<Link href={resultHref || (plan.start === 'mock' ? '/knowledge_graph' : '/today')} className={`${s.lime} ${s.doneButton}`}>
						{resultHref ? 'XEM KẾT QUẢ' : plan.start === 'mock' ? 'LÀM BÀI XÁC ĐỊNH' : 'VÀO TRANG HÔM NAY'}
					</Link>
				</div>
			)}

			{(isQuestion(step) || step === 'save') && (
				<footer className={`${s.footer} ${selected ? s.ok : ''}`}>
					<div className={s.footerInner}>
						<span className={s.footNote}>{selected && isQuestion(step) ? REPLY[step](selected) : step === 'save' ? 'Mất chưa tới 1 phút.' : ''}</span>
						<button type="button" className={s.next} disabled={gated} onClick={step === 'save' ? createProfile : () => go(1)}>
							{step === 'start' ? 'XẾP LỘ TRÌNH' : step === 'save' ? 'TẠO HỒ SƠ' : 'TIẾP TỤC'}
						</button>
					</div>
				</footer>
			)}
		</div>
	);
}
