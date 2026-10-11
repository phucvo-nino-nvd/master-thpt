'use client';

import { CamelLoading } from '@/components/camel-loading';
import page from '@/components/page.module.css';
import { ExamRoom, QUEST_MODES } from '@/features/exams/exam-room';
import { useLoad } from '@/lib/api';
import { Exam, HistoryMode, getDocument, getQuestTest, getReview } from '@/shared/api/client';

type ExamPageProps = { params: { id: string }; searchParams: { mode?: HistoryMode; limit?: string; retake?: string } };

export default function ExamPage({ params, searchParams }: ExamPageProps) {
	const id = decodeURIComponent(params.id);
	const mode = searchParams.mode ?? 'exam';
	const limit = Number(searchParams.limit) || undefined;
	const guestExam = () =>
		fetch(`/guest/12-${mode}.json`).then((res) => (res.ok ? (res.json() as Promise<Exam>) : Promise.reject(res)));
	const load = () =>
		id === 'guest' ? guestExam() : mode === 'review' ? getReview() : QUEST_MODES.includes(mode) ? getQuestTest(id) : getDocument(id);
	const { data: exam, loading, error } = useLoad<Exam | null>(load, null, [id, mode]);

	if (loading) return <CamelLoading title="Đang mở phòng thi…" />;

	if (!exam?.questions.length) {
		return (
			<main className={page.main}>
				<div className={page.inner}>
					{error ? <div className={page.error}>{error}</div> : <div className={page.empty}>Bài này chưa có câu hỏi.</div>}
				</div>
			</main>
		);
	}

	return <ExamRoom exam={limit ? { ...exam, questions: exam.questions.slice(0, limit) } : exam} mode={mode} retake={!!searchParams.retake} />;
}
