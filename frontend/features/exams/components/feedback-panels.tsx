import { MathText } from '@/features/exams/components/math-text';

type QuestionFeedbackPanelsProps = {
	hintError?: string;
	hints?: string[];
	solutionError?: string;
	solution?: string;
};

export function QuestionFeedbackPanels({
	hintError,
	hints = [],
	solutionError,
	solution,
}: QuestionFeedbackPanelsProps) {
	return (
		<>
			{hintError ? <p className="documents-error exam-submit-error">{hintError}</p> : null}
			{hints.length ? (
				<div className="exam-hint-box">
					<p className="exam-hint-title">Gợi ý từ AI</p>
					<div className="exam-hint-level-list">
						{hints.map((hint, index) => (
							<div className="exam-hint-level" key={index}>
								<span className="exam-hint-level-title">Gợi ý {index + 1}</span>
								<div className="exam-hint-content">
									<MathText text={hint} />
								</div>
							</div>
						))}
					</div>
				</div>
			) : null}

			{solutionError ? <p className="documents-error exam-submit-error">{solutionError}</p> : null}
			{solution ? (
				<div className="exam-review-box">
					<p className="exam-review-title">Lời giải từ AI</p>
					<div className="exam-review-content">
						<MathText text={solution} />
					</div>
				</div>
			) : null}
		</>
	);
}
