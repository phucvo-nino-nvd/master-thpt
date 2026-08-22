'use client';

import { DocumentsPageSkeleton } from '@/features/dashboard/components/loading-skeletons';
import { DashboardTopbar } from '@/features/dashboard/components/dashboard-topbar';
import { DocumentItem, PracticeStatus, getPracticeExams, updatePractice } from '@/shared/api/client';
import { getApiErrorMessage } from '@/shared/api/error-message';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

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
	const [query, setQuery] = useState('');
	const [isUpdating, setIsUpdating] = useState(false);
	const [updateError, setUpdateError] = useState('');
	const [status, setStatus] = useState<PracticeStatus | null>(null);

	async function loadPracticeExams(search = '') {
		setError('');

		try {
			const data = await getPracticeExams(search);
			setItems(data);
		} catch {
			setError('Không thể tải danh sách bài luyện tập. Vui lòng thử lại.');
		}
	}

	useEffect(() => {
		void loadPracticeExams(query).finally(() => setLoading(false));
	}, [query, router, status?.stage]);

	useEffect(() => {
		if (loading || error || items.length > 0 || isUpdating || query) {
			return;
		}

		const retryTimer = window.setTimeout(() => {
			void loadPracticeExams();
		}, 3000);

		return () => {
			window.clearTimeout(retryTimer);
		};
	}, [error, isUpdating, items.length, loading, query]);

	useEffect(() => {
		const textarea = textareaRef.current;
		if (!textarea) {
			return;
		}

		textarea.style.height = '0px';
		textarea.style.height = `${Math.min(textarea.scrollHeight, 128)}px`;
	}, [requestText]);

	function applySearch() {
		setUpdateError('');
		setQuery(requestText.trim());
	}

	async function fetchMoreExams() {
		if (isUpdating) {
			return;
		}

		const trimmedRequest = requestText.trim();

		setUpdateError('');
		setIsUpdating(true);
		setQuery(trimmedRequest);

		try {
			setItems(await updatePractice({ request: trimmedRequest }));
		} catch (error) {
			setUpdateError(
				getApiErrorMessage(error, 'Không thể gửi yêu cầu tìm thêm đề lúc này. Vui lòng thử lại.'),
			);
		} finally {
			setIsUpdating(false);
		}
	}

	function onSubmitSearch(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		applySearch();
	}

	function onComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
		const searchedNothing = query === requestText.trim() && items.length === 0;

		if ((event.key === 'Backspace' || event.key === 'Delete') && requestText && searchedNothing) {
			event.preventDefault();
			setRequestText('');
			setQuery('');

			return;
		}

		if (event.key !== 'Enter' || event.shiftKey) {
			return;
		}

		event.preventDefault();

		applySearch();
	}

	if (loading) {
		return <DocumentsPageSkeleton cardCount={4} showComposer />;
	}

	return (
		<main className="dashboard-shell documents-page practice-page">
			<DashboardTopbar onStatus={setStatus} />

			<header className="documents-head">
				<h1 className="documents-title">Luyện tập</h1>
				<p className="text-soft">
					Từng câu được chọn theo phần bạn còn yếu, làm xong là chấm ngay.
				</p>
			</header>

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
							{query
								? `Không có phần nào khớp "${query}". Bấm "Tìm thêm đề" nếu muốn nạp thêm câu.`
								: 'Hiện chưa có câu luyện tập nào được gán cho bạn.'}
						</section>
					) : null}
				</>
			) : null}

			<div className="practice-composer-dock">
				<form className="practice-composer-shell" onSubmit={onSubmitSearch}>
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
						type="button"
						className="practice-composer-fetch"
						onClick={fetchMoreExams}
						disabled={isUpdating}
					>
						{isUpdating ? (
							<span className="exam-submit-spinner practice-composer-spinner" aria-hidden="true" />
						) : (
							<svg viewBox="0 0 24 24" aria-hidden="true" className="practice-composer-icon">
								<path
									d="M12 5v14M5 12h14"
									stroke="currentColor"
									strokeWidth="2.2"
									strokeLinecap="round"
									fill="none"
								/>
							</svg>
						)}
						Tìm thêm đề
					</button>
					<button
						type="submit"
						className="practice-composer-send"
						disabled={!requestText.trim() || isUpdating}
						aria-label="Tìm trong danh sách đã có"
					>
						<svg viewBox="0 0 24 24" aria-hidden="true" className="practice-composer-icon">
							<path
								d="M4 12.75L19.2 4.6c.6-.32 1.3.2 1.16.88l-2.33 11.44a1 1 0 01-.8.79L5.8 19.95c-.69.14-1.22-.58-.88-1.18l2.92-5.17a1 1 0 000-.98L4.92 7.45c-.34-.6.2-1.32.88-1.18"
								fill="currentColor"
							/>
						</svg>
					</button>
				</form>
				{updateError ? <p className="documents-error practice-composer-error">{updateError}</p> : null}
			</div>
		</main>
	);
}
