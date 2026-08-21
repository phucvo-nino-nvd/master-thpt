import { MAX_HINT_LEVEL } from '@/shared/api/client';

type ExamQuestionHeaderProps = {
	questionIndex: number;
	showHintButton?: boolean;
	onAskHint: () => void;
	isHintLoading: boolean;
	hintCount: number;
	showSolutionButton?: boolean;
	onAskSolution?: () => void;
	isSolutionLoading?: boolean;
	hasSolution?: boolean;
	statusText?: string;
	statusTone?: 'is-correct' | 'is-wrong';
};

// This header is shared by exam, result, and history-review screens so button placement
// stays consistent when we add more per-question actions later.
export function ExamQuestionHeader({
	questionIndex,
	showHintButton = true,
	onAskHint,
	isHintLoading,
	hintCount,
	showSolutionButton = false,
	onAskSolution,
	isSolutionLoading = false,
	hasSolution = false,
	statusText,
	statusTone,
}: ExamQuestionHeaderProps) {
	return (
		<div className="exam-question-top">
			<div className="exam-question-chip">
				<span>{questionIndex}</span>
				<strong>CÂU {questionIndex}</strong>
			</div>
			<div className="exam-question-actions">
				{showHintButton ? (
					<button
						type="button"
						className="exam-hint-btn"
						onClick={onAskHint}
						disabled={isHintLoading || hintCount >= MAX_HINT_LEVEL}
					>
						{isHintLoading
							? 'Đang lấy gợi ý...'
							: hintCount === 0
								? 'Gợi ý'
								: hintCount < MAX_HINT_LEVEL
									? `Gợi ý tiếp (${hintCount}/${MAX_HINT_LEVEL})`
									: 'Hết gợi ý'}
					</button>
				) : null}
				{showSolutionButton && onAskSolution ? (
					<button
						type="button"
						className="exam-review-btn"
						onClick={onAskSolution}
						disabled={isSolutionLoading || hasSolution}
					>
						{/* Solutions are one-shot so users do not repeatedly call the AI endpoint. */}
						{isSolutionLoading ? 'Đang lấy lời giải...' : hasSolution ? 'Đã có lời giải' : 'Xem lời giải'}
					</button>
				) : null}
				{statusText && statusTone ? (
					<p className={`exam-result-status ${statusTone}`}>
						{statusText}
					</p>
				) : null}
			</div>
		</div>
	);
}
