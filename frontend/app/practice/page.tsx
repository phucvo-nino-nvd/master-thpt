'use client';

import { DocumentsPageSkeleton } from '@/features/dashboard/components/loading-skeletons';
import { DashboardTopbar } from '@/features/dashboard/components/dashboard-topbar';
import { DocumentItem, getPracticeExams, updatePractice } from '@/shared/api/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

const FILTER_DELAY = 200;

function formatPracticePrimaryMetric(item: DocumentItem) {
	return `${item.total_questions} câu • Lớp ${item.grade}`;
}

export default function PracticePage() {
	const router = useRouter();
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const [items, setItems] = useState<DocumentItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [requestText, setRequestText] = useState('');
	const [isUpdating, setIsUpdating] = useState(false);
	const [updateError, setUpdateError] = useState('');

	async function loadPracticeExams(query = '') {
		setError('');

		try {
			const data = await getPracticeExams(query);
			setItems(data);
		} catch {
			setError('Không thể tải danh sách bài luyện tập. Vui lòng thử lại.');
		}
	}

	useEffect(() => {
		const filterTimer = window.setTimeout(() => {
			void loadPracticeExams(requestText.trim()).finally(() => setLoading(false));
		}, FILTER_DELAY);

		return () => {
			window.clearTimeout(filterTimer);
		};
	}, [requestText, router]);

	useEffect(() => {
		if (loading || error || items.length > 0 || isUpdating || requestText.trim()) {
			return;
		}

		const retryTimer = window.setTimeout(() => {
			void loadPracticeExams();
		}, 3000);

		return () => {
			window.clearTimeout(retryTimer);
		};
	}, [error, isUpdating, items.length, loading, requestText]);

	useEffect(() => {
		const textarea = textareaRef.current;
		if (!textarea) {
			return;
		}

		textarea.style.height = '0px';
		textarea.style.height = `${Math.min(textarea.scrollHeight, 128)}px`;
	}, [requestText]);

	async function submitPracticeUpdate() {
		const trimmedRequest = requestText.trim();

		if (!trimmedRequest || isUpdating) {
			return;
		}

		setUpdateError('');
		setIsUpdating(true);

		try {
			setItems(await updatePractice({ request: trimmedRequest }));
		} catch {
			setUpdateError('Không thể gửi yêu cầu cập nhật lúc này. Vui lòng thử lại.');
		} finally {
			setIsUpdating(false);
		}
	}

	async function onSubmitUpdate(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		await submitPracticeUpdate();
	}

	function onComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
		if ((event.key === 'Backspace' || event.key === 'Delete') && requestText) {
			event.preventDefault();
			setRequestText('');

			return;
		}

		if (event.key !== 'Enter' || event.shiftKey) {
			return;
		}

		event.preventDefault();

		void submitPracticeUpdate();
	}

	if (loading) {
		return <DocumentsPageSkeleton cardCount={4} showComposer />;
	}

	return (
		<main className="dashboard-shell documents-page practice-page">
			<DashboardTopbar />

			<header className="documents-head">
				<h1 className="documents-title">Luyện tập</h1>
				<p className="text-soft">
					Từng câu được chọn theo phần bạn còn yếu, làm xong là chấm ngay.
				</p>
			</header>

			{isUpdating ? (
				<p className="documents-message practice-status" role="status" aria-live="polite">
					Đang cập nhật danh sách đề luyện tập...
				</p>
			) : null}

			{error ? <p className="documents-error">{error}</p> : null}

			{!error ? (
				<>
					<p className="documents-count">
						Có {items.length} phần cần luyện thêm
					</p>
					<section className="documents-grid">
						{items.map((item) => (
							<article key={item.id} className="documents-card">
								<div className="documents-card-top">
									<p className="documents-card-type">Phần cần củng cố</p>
									<h2 className="documents-card-title">{item.title}</h2>
									<p className="documents-card-stat">{formatPracticePrimaryMetric(item)}</p>
								</div>
								<div className="documents-card-bottom">
									<div className="documents-tags">
										<span className="documents-tag">{item.subject}</span>
									</div>
									<div className="documents-card-actions">
										<Link href={`/exams/${item.id}?intent=practice`} className="btn-primary documents-start-btn">
											Luyện ngay
										</Link>
									</div>
								</div>
							</article>
						))}
					</section>

					{items.length === 0 ? (
						<section className="documents-empty" aria-live="polite">
							Hiện chưa có câu luyện tập nào được gán cho bạn.
						</section>
					) : null}
				</>
			) : null}

			<div className="practice-composer-dock">
				<form className="practice-composer-shell" onSubmit={onSubmitUpdate}>
					<textarea
						ref={textareaRef}
						className="practice-composer-input"
						placeholder="Bạn muốn luyện thêm dạng bài nào?"
						value={requestText}
						onChange={(event) => setRequestText(event.target.value)}
						onKeyDown={onComposerKeyDown}
						disabled={isUpdating}
						rows={1}
					/>
					<button
						type="submit"
						className="practice-composer-send"
						disabled={!requestText.trim() || isUpdating}
						aria-label={isUpdating ? 'Đang gửi yêu cầu cập nhật' : 'Gửi yêu cầu cập nhật'}
					>
						{isUpdating ? (
							<span className="exam-submit-spinner practice-composer-spinner" aria-hidden="true" />
						) : (
							<svg viewBox="0 0 24 24" aria-hidden="true" className="practice-composer-icon">
								<path
									d="M4 12.75L19.2 4.6c.6-.32 1.3.2 1.16.88l-2.33 11.44a1 1 0 01-.8.79L5.8 19.95c-.69.14-1.22-.58-.88-1.18l2.92-5.17a1 1 0 000-.98L4.92 7.45c-.34-.6.2-1.32.88-1.18"
									fill="currentColor"
								/>
							</svg>
						)}
					</button>
				</form>
				{updateError ? <p className="documents-error practice-composer-error">{updateError}</p> : null}
			</div>
		</main>
	);
}
