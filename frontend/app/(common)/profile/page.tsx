'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AVATARS, initialsOf, useAccount } from '@/components/account-provider';
import { BoltIcon, FlameIcon, PencilIcon } from '@/components/icons';
import page from '@/components/page.module.css';
import { Plans } from '@/components/plans';
import { useMounted } from '@/lib/api';
import { dayKey, weekdayIndex } from '@/lib/format';
import { Account, AccountUpdate, resetQuest } from '@/shared/api/client';
import { getApiErrorMessage } from '@/shared/api/error-message';
import s from './profile.module.css';

const TABS = [
	['profile', 'Hồ sơ'],
	['plan', 'Gói học'],
	['settings', 'Cài đặt'],
] as const;
const MINUTES = [10, 20, 30, 45];
const LEVELS = ['#ECEDF2', '#FFD2C4', '#FF9F80', '#F2542D', '#C23B19'];
const WEEKS = 52;
const SAVED_FLASH_MS = 2200;
const TOGGLES = [
	['remind', 'Nhắc học mỗi ngày', 'Gửi thông báo lúc 20:00 nếu chưa giữ lửa'],
	['sound', 'Âm thanh khi trả lời', 'Tiếng "ting" khi đúng, "bụp" khi sai'],
] as const;
const EMPTY_PASSWORDS = { current: '', next: '', again: '' };

type Tab = (typeof TABS)[number][0];

const levelOf = (count: number) => (count === 0 ? 0 : count < 5 ? 1 : count < 10 ? 2 : count < 15 ? 3 : 4);

function Heatmap({ account }: { account: Account }) {
	const counts = new Map(account.activity.map((day) => [day.date, day.count]));
	const today = new Date();
	const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - WEEKS * 7 - weekdayIndex(today));
	const days = Array.from({ length: WEEKS * 7 + weekdayIndex(today) + 1 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
	const months = Array.from({ length: WEEKS + 1 }, (_, week) => {
		const month = days[week * 7].getMonth();
		const fresh = week === 0 ? days[7].getMonth() === month : days[(week - 1) * 7].getMonth() !== month;
		return fresh ? `Th${month + 1}` : '';
	});

	let run = 0;
	let longest = 0;
	for (const day of days) {
		run = counts.get(dayKey(day)) ? run + 1 : 0;
		longest = Math.max(longest, run);
	}

	return (
		<div className={s.card}>
			<div className={s.heatHead}>
				{days.filter((day) => counts.get(dayKey(day))).length} ngày học trong 12 tháng qua
				<div className={s.heatStats}>
					<span>
						Chuỗi dài nhất <strong>{longest} ngày</strong>
					</span>
					<span>
						Hiện tại <strong>{account.streak} ngày</strong>
					</span>
				</div>
			</div>
			<div className={s.heat}>
				<span />
				<div className={s.months}>
					{months.map((label, i) => (
						<span key={i}>{label}</span>
					))}
				</div>
				<div className={s.days}>
					<span>T2</span>
					<span />
					<span>T4</span>
					<span />
					<span>T6</span>
					<span />
					<span>CN</span>
				</div>
				<div className={s.cells}>
					{days.map((day, i) => {
						const count = counts.get(dayKey(day)) ?? 0;
						return (
							<span
								key={i}
								className={i === days.length - 1 ? s.now : ''}
								title={`${count ? `${count} câu` : 'Không học'} · ${day.toLocaleDateString('vi-VN')}`}
								style={{ background: LEVELS[levelOf(count)] }}
							/>
						);
					})}
				</div>
			</div>
			<div className={s.scale}>
				Ít
				{LEVELS.map((color) => (
					<span key={color} style={{ background: color }} />
				))}
				Nhiều
			</div>
		</div>
	);
}

export default function ProfilePage({ searchParams }: { searchParams: { tab?: string } }) {
	const { account, name, save } = useAccount();
	const { user } = useUser();
	const { signOut } = useClerk();
	const router = useRouter();
	const restart = () => {
		if (window.confirm('Làm lại lộ trình từ đầu? Em sẽ làm lại bài xác định trình độ, lịch sử làm bài vẫn được giữ.')) void resetQuest().then(() => router.push('/knowledge_graph'));
	};
	const mounted = useMounted();
	const requested = TABS.find(([key]) => key === searchParams.tab)?.[0];
	const [tab, setTab] = useState<Tab>(requested ?? 'profile');
	const [draft, setDraft] = useState<{ name: string; avatar: number } | null>(null);
	const [passwords, setPasswords] = useState(EMPTY_PASSWORDS);
	const [passwordOpen, setPasswordOpen] = useState(false);
	const [saved, setSaved] = useState(false);
	const [error, setError] = useState('');
	const form = draft ?? { name: account.name || name, avatar: account.avatar };
	const [from, to] = AVATARS[form.avatar] ?? AVATARS[0];
	const pro = account.plan === 'pro';
	const joined = account.joined_at ? new Date(account.joined_at) : null;

	useEffect(() => {
		if (requested) setTab(requested);
	}, [requested]);

	useEffect(() => {
		if (!saved) return;
		const timer = setTimeout(() => setSaved(false), SAVED_FLASH_MS);
		return () => clearTimeout(timer);
	}, [saved]);

	const attempt = async (task: () => Promise<void>) => {
		setError('');
		try {
			await task();
		} catch (failure) {
			setError(getApiErrorMessage(failure, 'Chưa lưu được. Thử lại nha.'));
		}
	};

	const update = (patch: AccountUpdate) => attempt(() => save(patch));


	const saveProfile = () =>
		attempt(async () => {
			if (passwordOpen && (passwords.current || passwords.next)) {
				if (passwords.next !== passwords.again) throw new Error('Mật khẩu nhập lại chưa khớp.');
				if (!user) throw new Error('Cần đăng nhập để đổi mật khẩu.');
				await user.updatePassword({ currentPassword: passwords.current, newPassword: passwords.next });
			}
			await save({ name: form.name.trim(), avatar: form.avatar });
			setDraft(null);
			setPasswords(EMPTY_PASSWORDS);
			setPasswordOpen(false);
			setSaved(true);
		});

	return (
		<main className={`${page.main} ${s.main}`}>
			<div className={`${page.inner} ${s.inner}`}>
				<article className={s.hero}>
					<div className={s.banner} />
					<div className={s.heroBody}>
						<div className={s.avatarWrap}>
							<div className={s.avatar} style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
								{initialsOf(form.name)}
							</div>
							<button type="button" className={s.edit} title="Đổi ảnh" onClick={() => setTab('profile')}>
								<PencilIcon />
							</button>
						</div>
						<div className={s.who}>
							<h1 className={s.name}>{form.name || name}</h1>
							<div className={s.joined}>{joined ? `Tham gia từ ${String(joined.getMonth() + 1).padStart(2, '0')}/${joined.getFullYear()}` : 'Thành viên mới'}</div>
						</div>
						<div className={s.pills}>
							<span className={s.pill}>
								<FlameIcon size={18} />
								{account.streak}
							</span>
							<span className={`${s.pill} ${s.xp}`}>
								<BoltIcon size={16} />
								{account.xp.toLocaleString('vi-VN')} XP
							</span>
							<span className={`${s.pill} ${s.planPill} ${pro ? s.proPill : ''}`}>{pro ? 'PRO' : 'FREE'}</span>
						</div>
					</div>
				</article>

				<div className={s.tabs}>
					{TABS.map(([key, label]) => (
						<button key={key} type="button" className={tab === key ? s.on : ''} onClick={() => setTab(key)}>
							{label}
						</button>
					))}
				</div>

				{error && <div className={page.error}>{error}</div>}

				{tab === 'profile' && (
					<>
						<div className={s.card}>
							<div className={s.cardTitle}>Thông tin cá nhân</div>
							<div className={s.fields}>
								<label className={s.field}>
									Tên hiển thị
									<input className={s.input} value={form.name} maxLength={24} onChange={(event) => setDraft({ ...form, name: event.target.value })} />
								</label>
							</div>
							<div className={s.section}>Ảnh đại diện</div>
							<div className={s.avatars}>
								{AVATARS.map(([c0, c1], i) => (
									<button key={c0 + c1} type="button" title="Chọn màu" className={`${s.swatch} ${form.avatar === i ? s.on : ''}`} onClick={() => setDraft({ ...form, avatar: i })}>
										<span style={{ background: `linear-gradient(135deg, ${c0}, ${c1})` }}>{initialsOf(form.name)}</span>
									</button>
								))}
							</div>
							<div className={s.password}>
								<div className={s.who}>
									<div className={s.section}>Mật khẩu</div>
									<div className={s.dots}>••••••••</div>
								</div>
								<button type="button" className={s.small} onClick={() => setPasswordOpen(!passwordOpen)}>
									{passwordOpen ? 'HUỶ' : 'ĐỔI MẬT KHẨU'}
								</button>
							</div>
							{passwordOpen && (
								<div className={s.passwords}>
									<input className={s.input} type="password" placeholder="Mật khẩu hiện tại" value={passwords.current} onChange={(event) => setPasswords({ ...passwords, current: event.target.value })} />
									<input className={s.input} type="password" placeholder="Mật khẩu mới" value={passwords.next} onChange={(event) => setPasswords({ ...passwords, next: event.target.value })} />
									<input className={s.input} type="password" placeholder="Nhập lại mật khẩu mới" value={passwords.again} onChange={(event) => setPasswords({ ...passwords, again: event.target.value })} />
								</div>
							)}
							<div className={s.save}>
								{saved && <span className={s.savedNote}>Đã lưu ✓</span>}
								<button type="button" className={s.saveButton} onClick={saveProfile}>
									LƯU THAY ĐỔI
								</button>
							</div>
						</div>
						{mounted && <Heatmap account={account} />}
					</>
				)}

				{tab === 'plan' && <Plans run={attempt} />}

				{tab === 'settings' && (
					<>
						<div className={`${s.card} ${s.toggles}`}>
							{TOGGLES.map(([key, title, sub]) => (
								<div key={key} className={s.toggle}>
									<div>
										<div className={s.toggleTitle}>{title}</div>
										<div className={s.toggleSub}>{sub}</div>
									</div>
									<button
										type="button"
										title={title}
										className={`${s.switch} ${account.settings[key] ? s.on : ''}`}
										onClick={() => update({ settings: { [key]: !account.settings[key] } })}
									/>
								</div>
							))}
						</div>
						<div className={s.card}>
							<div className={s.toggleTitle}>Thời gian học mỗi ngày</div>
							<div className={`${s.row} ${s.minutes}`}>
								{MINUTES.map((minutes) => (
									<button
										key={minutes}
										type="button"
										className={`${s.option} ${account.settings.minutes === minutes ? s.green : ''}`}
										onClick={() => update({ settings: { minutes } })}
									>
										{minutes} phút
									</button>
								))}
							</div>
						</div>
						<div className={s.logout}>
							<div className={s.who}>
								<div className={s.toggleTitle}>Làm lại lộ trình</div>
								<div className={s.toggleSub}>Xếp lại trạm từ bài xác định trình độ. Lịch sử làm bài vẫn giữ nguyên.</div>
							</div>
							<button type="button" className={s.small} onClick={restart}>
								LÀM LẠI
							</button>
						</div>
						<div className={s.logout}>
							<div className={s.who}>
								<div className={s.toggleTitle}>Đăng xuất khỏi thiết bị này</div>
								<div className={s.toggleSub}>Tiến độ đã lưu trên tài khoản, đăng nhập lại là còn nguyên.</div>
							</div>
							<button type="button" className={s.logoutButton} onClick={() => signOut({ redirectUrl: '/onboarding' })}>
								ĐĂNG XUẤT
							</button>
						</div>
					</>
				)}
			</div>
		</main>
	);
}
