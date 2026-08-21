type DocumentsPageSkeletonProps = {
	cardCount?: number;
	showComposer?: boolean;
};

function SkeletonBox({ className = '' }: { className?: string }) {
	return <span className={`ui-skeleton ${className}`.trim()} aria-hidden="true" />;
}

function AppTopbarSkeleton() {
	return (
		<header className="dash-topbar dash-topbar-skeleton" aria-hidden="true">
			<div className="dash-brand">
				<SkeletonBox className="dash-skeleton-dot" />
				<SkeletonBox className="dash-skeleton-brand" />
			</div>
			<div className="dash-nav dash-nav-skeleton">
				<SkeletonBox className="dash-skeleton-pill" />
				<SkeletonBox className="dash-skeleton-pill" />
				<SkeletonBox className="dash-skeleton-pill" />
			</div>
			<div className="dash-userbar">
				<SkeletonBox className="dash-skeleton-streak" />
				<SkeletonBox className="dash-skeleton-avatar" />
			</div>
		</header>
	);
}

export function DocumentsPageSkeleton({
	cardCount = 6,
	showComposer = false,
}: DocumentsPageSkeletonProps) {
	return (
		<main className="dashboard-shell documents-page documents-page-skeleton">
			<AppTopbarSkeleton />

			<header className="documents-head" aria-hidden="true">
				<SkeletonBox className="documents-skeleton-heading" />
				<SkeletonBox className="documents-skeleton-subheading" />
			</header>

			<section className="documents-toolbar documents-toolbar-skeleton" aria-hidden="true">
				<SkeletonBox className="documents-skeleton-search" />
				<SkeletonBox className="documents-skeleton-select" />
				<SkeletonBox className="documents-skeleton-select" />
				<SkeletonBox className="documents-skeleton-select" />
			</section>

			<SkeletonBox className="documents-skeleton-count" />

			<section className="documents-grid" aria-hidden="true">
				{Array.from({ length: cardCount }).map((_, index) => (
					<article key={index} className="documents-card documents-card-skeleton">
						<div className="documents-card-top">
							<SkeletonBox className="documents-skeleton-kicker" />
							<SkeletonBox className="documents-skeleton-title" />
							<SkeletonBox className="documents-skeleton-title documents-skeleton-title-short" />
							<SkeletonBox className="documents-skeleton-stat" />
							<SkeletonBox className="documents-skeleton-meta" />
						</div>
						<div className="documents-card-bottom">
							<div className="documents-tags">
								<SkeletonBox className="documents-skeleton-tag" />
							</div>
							<div className="documents-card-actions">
								<SkeletonBox className="documents-skeleton-button" />
							</div>
						</div>
					</article>
				))}
			</section>

			{showComposer ? (
				<div className="practice-composer-dock practice-composer-dock-skeleton" aria-hidden="true">
					<div className="practice-composer-shell">
						<SkeletonBox className="practice-skeleton-input" />
						<SkeletonBox className="practice-skeleton-send" />
					</div>
				</div>
			) : null}
		</main>
	);
}

