'use client';

import { CamelLoading } from '@/components/camel-loading';
import page from '@/components/page.module.css';
import { ExamRoom } from '@/features/exams/exam-room';
import { useLoad } from '@/lib/api';
import { historyTitle } from '@/lib/history';
import { getDocument, getDocuments, getHistory, getQuest } from '@/shared/api/client';

async function loadReview(id: string) {
	const [detail, documents, quest] = await Promise.all([
		getHistory(id),
		getDocuments().catch(() => []),
		getQuest().catch(() => null),
	]);
	const exam = await getDocument(detail.exam_id, id);
	const answered = new Set(detail.questions.map((entry) => entry.question_id));
	const title = historyTitle(detail.exam_id, new Map(documents.map((doc) => [doc.id, doc.title])), quest, exam.title);

	return { detail, exam: { ...exam, title, questions: exam.questions.filter((question) => answered.has(question.id)) } };
}

export default function HistoryDetailPage({ params }: { params: { id: string } }) {
	const id = decodeURIComponent(params.id);
	const { data, loading, error } = useLoad(() => loadReview(id), null, [id]);

	if (loading) return <CamelLoading title="Đang mở bài làm…" />;

	if (!data?.exam.questions.length) {
		return (
			<main className={page.main}>
				<div className={page.inner}>
					{error ? <div className={page.error}>{error}</div> : <div className={page.empty}>Lượt này chưa lưu câu trả lời nào.</div>}
				</div>
			</main>
		);
	}

	return <ExamRoom exam={data.exam} mode={data.detail.mode} review={data.detail} />;
}
