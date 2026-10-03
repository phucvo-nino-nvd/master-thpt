'use client';

import page from '@/components/page.module.css';
import { ExamRoom } from '@/features/exams/exam-room';
import { useLoad } from '@/lib/api';
import { getDocument, getHistory } from '@/shared/api/client';

async function loadReview(id: string) {
	const detail = await getHistory(id);
	const exam = await getDocument(detail.exam_id, id);
	const answered = new Set(detail.questions.map((entry) => entry.question_id));

	return { detail, exam: { ...exam, questions: exam.questions.filter((question) => answered.has(question.id)) } };
}

export default function HistoryDetailPage({ params }: { params: { id: string } }) {
	const id = decodeURIComponent(params.id);
	const { data, error } = useLoad(() => loadReview(id), null, [id]);

	if (!data?.exam.questions.length) {
		return (
			<main className={page.main}>
				<div className={page.inner}>
					{error ? <div className={page.error}>{error}</div> : <div className={page.empty}>{data ? 'Lượt này chưa lưu câu trả lời nào.' : 'Đang mở bài làm…'}</div>}
				</div>
			</main>
		);
	}

	return <ExamRoom exam={data.exam} mode={data.detail.mode} review={data.detail} />;
}
