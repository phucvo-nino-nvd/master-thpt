import { PracticeStatus } from '@/shared/api/client';
import { Fragment } from 'react';

const STAGES = [
	{ key: 'crawler_agent', label: 'Tìm đề' },
	{ key: 'parser_agent', label: 'Bóc tách câu' },
	{ key: 'item_bank', label: 'Gán chủ đề' },
	{ key: 'done', label: 'Hoàn thành' },
];

const ALIASES: Record<string, { key: string; label: string }> = {
	author_agent: { key: 'parser_agent', label: 'Tự soạn câu' },
};

function formatCaption(status: PracticeStatus) {
	if (status.stage === 'done') {
		return 'Đã xong, câu mới đã vào kho luyện tập.';
	}

	const parts = [];

	if (status.concept) {
		parts.push(`"${status.concept}"`);
	}

	if (status.total) {
		parts.push(`đề ${status.step}/${status.total}`);
	}

	return parts.length ? `${parts.join(' • ')}...` : 'Đang xử lý...';
}

export function PracticeSteps({ status }: { status: PracticeStatus }) {
	const alias = ALIASES[status.stage ?? ''];
	const stageIndex = STAGES.findIndex((step) => step.key === (alias?.key ?? status.stage));
	const activeIndex = stageIndex < 0 ? 0 : stageIndex;

	return (
		<div className="practice-steps" role="status" aria-live="polite">
			<div className="practice-steps-row">
				{STAGES.map((stage, index) => (
					<Fragment key={stage.key}>
						{index > 0 ? <span className="practice-step-line" aria-hidden="true" /> : null}
						<span className={`practice-step ${index < activeIndex ? 'is-done' : index === activeIndex ? 'is-active' : ''}`}>
							<span className="practice-step-bead" aria-hidden="true">
								{index < activeIndex || stage.key === 'done' ? '✓' : index + 1}
							</span>
							{index === activeIndex && alias ? alias.label : stage.label}
						</span>
					</Fragment>
				))}
			</div>
			<p className="practice-steps-caption">{formatCaption(status)}</p>
		</div>
	);
}
