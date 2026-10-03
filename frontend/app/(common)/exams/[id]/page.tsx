'use client';

import page from '@/components/page.module.css';
import { ExamRoom, QUEST_MODES } from '@/features/exams/exam-room';
import { useLoad } from '@/lib/api';
import { ANSWERS_KEY, readPending } from '@/lib/pending';
import { Exam, HistoryMode, getDocument, getQuestTest, getReview } from '@/shared/api/client';

type ExamPageProps = { params: { id: string }; searchParams: { mode?: HistoryMode; limit?: string; retake?: string } };

export default function ExamPage({ params, searchParams }: ExamPageProps) {
	const id = decodeURIComponent(params.id);
	const mode = searchParams.mode ?? 'exam';
	const limit = Number(searchParams.limit) || undefined;
	const guestExam = () =>
		fetch(`/guest/${readPending<{ grade?: string }>(ANSWERS_KEY)?.grade}-${mode}.json`).then((res) => (res.ok ? (res.json() as Promise<Exam>) : Promise.reject(res)));
	const load = () =>
		id === 'guest' ? guestExam() : mode === 'review' ? getReview() : QUEST_MODES.includes(mode) ? getQuestTest(id) : getDocument(id);
	const { data: exam, error } = useLoad<Exam | null>(load, null, [id, mode]);

	if (!exam?.questions.length) {
		return (
			<main className={page.main}>
				<div className={page.inner}>
					{error ? <div className={page.error}>{error}</div> : <div className={page.empty}>{exam ? 'Bài này chưa có câu hỏi.' : 'Đang mở phòng thi…'}</div>}
				</div>
			</main>
		);
	}

	return <ExamRoom exam={limit ? { ...exam, questions: exam.questions.slice(0, limit) } : exam} mode={mode} retake={!!searchParams.retake} />;
}
