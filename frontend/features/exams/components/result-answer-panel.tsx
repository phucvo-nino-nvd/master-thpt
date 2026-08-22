import { MathText } from '@/features/exams/components/math-text';
import { AnswerValue, formatAnswer } from '@/features/exams/lib/helpers';
import { FlatQuestion } from '@/features/exams/lib/types';
import { AnswerPayload, Evaluation } from '@/shared/api/client';

type ResultAnswerPanelProps = {
	question: FlatQuestion;
	studentAnswer?: AnswerValue;
	correctAnswer: AnswerPayload;
	evaluation: Evaluation;
};

// This read-only renderer mirrors EditableAnswerPanel, but focuses on explaining
// what happened after grading instead of collecting input.
export function ResultAnswerPanel({ question, studentAnswer, correctAnswer, evaluation }: ResultAnswerPanelProps) {
	function answerPanel() {
		if (question.sectionType === 'multiple_choice') {
			const selected = typeof studentAnswer === 'string' ? studentAnswer.trim() : '';
			const correctLabel = typeof correctAnswer === 'string' ? correctAnswer.trim() : '';

			return (
				<div className="exam-mc-grid exam-result-panel">
					{question.question.options.map((option) => {
						const isStudentSelected = selected === option.label;
						const isCorrectOption = correctLabel
							? option.label === correctLabel
							: isStudentSelected && evaluation.correct;
						const isWrongSelected = isStudentSelected && !isCorrectOption;

						return (
							<div
								key={`${question.question_id}-${option.label}`}
								className={`exam-mc-option exam-result-option ${isCorrectOption ? 'is-correct' : ''} ${isWrongSelected ? 'is-wrong' : ''}`}
							>
								<div className="exam-mc-option-main">
									<span className="exam-mc-badge">{option.label}</span>
									<MathText text={option.content} />
								</div>
								<span className={`exam-result-tag ${isCorrectOption ? 'is-correct' : isStudentSelected ? 'is-wrong' : ''}`}>
									{isCorrectOption ? 'Đúng' : isStudentSelected ? 'Bạn chọn' : ''}
								</span>
							</div>
						);
					})}
				</div>
			);
		}

		if (question.sectionType === 'true_false') {
			const parts = question.question.parts;
			const studentParts = Array.isArray(studentAnswer) ? studentAnswer : [];

			return (
				<div className="exam-tf-table exam-result-panel">
					<div className="exam-tf-head">
						<p>PHÁT BIỂU</p>
						<p>ĐÚNG</p>
						<p>SAI</p>
					</div>

					{parts.map((part, index) => {
						const picked = studentParts[index] ?? null;
						const tone = evaluation.part_correct[index] ? 'is-correct' : 'is-wrong';

						return (
							<div key={`${question.question_id}-${index}`} className={`exam-tf-item exam-tf-result-item ${tone}`}>
								<div className="exam-tf-statement">
									<span className="exam-tf-label">{part.label.toUpperCase()}</span>
									<p><MathText text={part.content} /></p>
								</div>
								<span className={`exam-tf-radio ${picked === true ? tone : ''}`} />
								<span className={`exam-tf-radio ${picked === false ? tone : ''}`} />
							</div>
						);
					})}
				</div>
			);
		}

		// Short-answer review only needs the submitted value and the correct answer.
		return (
			<div className="exam-short-wrap exam-result-panel">
				<div className={`exam-result-short ${evaluation.correct ? 'is-correct' : 'is-wrong'}`}>
					<p><strong>Bạn trả lời:</strong> {formatAnswer(studentAnswer) || 'Bỏ trống'}</p>
					<p><strong>Đáp án đúng:</strong> {formatAnswer(correctAnswer) || 'Chưa có'}</p>
				</div>
			</div>
		);
	}

	return (
		<>
			{answerPanel()}

			{evaluation.feedback ? (
				<div className="exam-review-box">
					<p className="exam-review-title">Nhận xét</p>
					<div className="exam-review-content">
						<MathText text={evaluation.feedback} />
					</div>
				</div>
			) : null}
		</>
	);
}
