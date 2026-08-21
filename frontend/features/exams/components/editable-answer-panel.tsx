import { MathText } from '@/features/exams/components/math-text';
import { AnswerValue, getAlphabetLabel } from '@/features/exams/lib/helpers';
import { FlatQuestion } from '@/features/exams/lib/types';

type EditableAnswerPanelProps = {
	question: FlatQuestion;
	answer?: AnswerValue;
	onChange: (value: AnswerValue) => void;
	disabled?: boolean;
};

// Keep each answer type isolated here so future question formats can be added
// without making the page-level containers harder to follow.
export function EditableAnswerPanel({
	question,
	answer,
	onChange,
	disabled = false,
}: EditableAnswerPanelProps) {
	if (question.sectionType === 'multiple_choice') {
		return (
			<div className="exam-mc-grid">
				{question.question.options.map((option) => {
					const isSelected = answer === option.label;

					return (
						<button
							key={`${question.question_id}-${option.label}`}
							type="button"
							className={`exam-mc-option ${isSelected ? 'is-selected' : ''}`}
							onClick={() => onChange(option.label)}
							disabled={disabled}
						>
							<div className="exam-mc-option-main">
								<span className="exam-mc-badge">{option.label}</span>
								<MathText text={option.content} />
							</div>
							<span className="exam-mc-tail">{option.label}</span>
						</button>
					);
				})}
			</div>
		);
	}

	if (question.sectionType === 'true_false') {
		const parts = question.question.parts;
		const picked = Array.isArray(answer) ? answer : [];

		return (
			<div className="exam-tf-table">
				<div className="exam-tf-head">
					<p>PHÁT BIỂU</p>
					<p>ĐÚNG</p>
					<p>SAI</p>
				</div>

				{parts.map((part, index) => {
					const current = picked[index] ?? null;

					function updatePart(next: boolean) {
						// The API grades true/false per part, so the answer stays a per-part list.
						const clone = parts.map((_, position) => picked[position] ?? null);
						clone[index] = next;
						onChange(clone);
					}

					return (
						<div key={`${question.question_id}-${index}`} className="exam-tf-item">
							<div className="exam-tf-statement">
								<span className="exam-tf-label">{part.label.toUpperCase()}</span>
								<p><MathText text={part.content} /></p>
							</div>

							<button
								type="button"
								className={`exam-tf-radio ${current === true ? 'is-selected' : ''}`}
								onClick={() => updatePart(true)}
								aria-label={`Chọn đúng cho phát biểu ${getAlphabetLabel(index)}`}
								disabled={disabled}
							/>
							<button
								type="button"
								className={`exam-tf-radio ${current === false ? 'is-selected' : ''}`}
								onClick={() => updatePart(false)}
								aria-label={`Chọn sai cho phát biểu ${getAlphabetLabel(index)}`}
								disabled={disabled}
							/>
						</div>
					);
				})}
			</div>
		);
	}

	// Short-answer remains a plain text field for now.
	// If we later support richer math input, this is the only branch that needs to evolve.
	return (
		<div className="exam-short-wrap">
			<input
				type="text"
				className="exam-short-input"
				placeholder=""
				value={typeof answer === 'string' ? answer : ''}
				onChange={(event) => onChange(event.target.value)}
				disabled={disabled}
			/>
		</div>
	);
}
