'use client';

import { useClerk } from '@clerk/nextjs';
import { CheckoutButton, SubscriptionDetailsButton } from '@clerk/nextjs/experimental';
import { useAccount } from '@/components/account-provider';
import { CheckIcon, CrownIcon } from '@/components/icons';
import { AccountUpdate, MOCK_ACCOUNT } from '@/shared/api/client';
import s from './plans.module.css';

const FREE_FEATURES = ['Lộ trình học theo khối', 'Bài luyện mỗi ngày', '5 đề thi thử mỗi tháng'];
const PRO_FEATURES = ['Toàn bộ kho đề, không giới hạn', 'Giải thích từng bước mọi câu', 'Hỏi trợ lý về từng câu đã làm', 'Đấu trường thi thử mỗi tuần', 'Giữ lửa 2 lần/tháng khi lỡ nghỉ'];
const PRO_PLAN_ID = process.env.NEXT_PUBLIC_CLERK_PRO_PLAN_ID ?? '';

export function Plans({ run, onCheckout }: { run: (task: () => Promise<void>) => unknown; onCheckout?: () => void }) {
	const { account, save, reload } = useAccount();
	const { session } = useClerk();
	const pro = account.plan === 'pro';

	const update = (patch: AccountUpdate) => run(async () => {
			await save(patch);
		});

	const upgraded = () =>
		run(async () => {
			await session?.getToken({ skipCache: true });
			reload();
		});

	return (
		<div className={s.plans}>
			<article className={`${s.plan} ${pro ? '' : s.current}`}>
				<div className={s.planHead}>
					FREE
					{!pro && <span className={s.using}>ĐANG DÙNG</span>}
				</div>
				<div className={s.price}>0đ</div>
				<div className={s.planCopy}>Học đều mỗi ngày, không tốn đồng nào.</div>
				<div className={s.features}>
					{FREE_FEATURES.map((feature) => (
						<div key={feature}>
							<span className={s.tick}>
								<CheckIcon size={12} strokeWidth={4} />
							</span>
							{feature}
						</div>
					))}
				</div>
				{pro && !MOCK_ACCOUNT ? (
					<SubscriptionDetailsButton onSubscriptionCancel={upgraded}>
						<button type="button" className={s.planButton}>
							QUẢN LÝ GÓI
						</button>
					</SubscriptionDetailsButton>
				) : (
					<button type="button" className={s.planButton} disabled={!pro} onClick={() => update({ plan: 'free' })}>
						{pro ? 'CHUYỂN VỀ FREE' : 'GÓI HIỆN TẠI'}
					</button>
				)}
			</article>
			<article className={`${s.plan} ${s.pro} ${pro ? s.current : ''}`}>
				<div className={s.planHead}>
					<span className={s.crown}>
						<CrownIcon />
						PRO
					</span>
					{pro && <span className={s.using}>ĐANG DÙNG</span>}
				</div>
				<div className={s.price}>
					79.000đ<small>/ tháng</small>
				</div>
				<div className={s.planCopy}>Cho giai đoạn tăng tốc trước kỳ thi.</div>
				<div className={s.features}>
					{PRO_FEATURES.map((feature) => (
						<div key={feature}>
							<span className={s.tick}>
								<CheckIcon size={12} strokeWidth={4} />
							</span>
							{feature}
						</div>
					))}
				</div>
				{pro || MOCK_ACCOUNT ? (
					<button type="button" className={s.planButton} disabled={pro} onClick={() => update({ plan: 'pro' })}>
						{pro ? 'ĐANG DÙNG PRO' : 'NÂNG CẤP PRO'}
					</button>
				) : (
					<span style={{ display: 'contents' }} onClick={onCheckout}>
						<CheckoutButton planId={PRO_PLAN_ID} planPeriod="month" onSubscriptionComplete={upgraded}>
							<button type="button" className={s.planButton}>
								NÂNG CẤP PRO
							</button>
						</CheckoutButton>
					</span>
				)}
			</article>
		</div>
	);
}
