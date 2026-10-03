'use client';

import { useAuth, useClerk } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MOCK_ACCOUNT } from '@/shared/api/client';
import { AVATARS, initialsOf, useAccount } from './account-provider';
import { BookIcon, ChecklistIcon, ChevronUpIcon, GearIcon, HistoryIcon, LogoutIcon, RouteIcon, SunIcon, UserIcon } from './icons';
import s from './sidebar.module.css';

const NAV = [
	{ href: '/today', label: 'Hôm nay', icon: <SunIcon /> },
	{ href: '/knowledge_graph', label: 'Lộ trình', icon: <RouteIcon /> },
	{ href: '/documents', label: 'Kho đề thi', icon: <BookIcon /> },
	{ href: '/practice', label: 'Nhiệm vụ', icon: <ChecklistIcon /> },
	{ href: '/history', label: 'Lịch sử', icon: <HistoryIcon /> },
];

export function Sidebar() {
	const pathname = usePathname();
	const { signOut } = useClerk();
	const { isLoaded, isSignedIn } = useAuth();
	const { account, name } = useAccount();
	const [from, to] = AVATARS[account.avatar] ?? AVATARS[0];

	if (pathname.startsWith('/exams')) return null;

	return (
		<nav className={s.nav}>
			<div className={s.brand}>
				<span className={s.mark}>M</span>MASTER THPT
			</div>

			{NAV.map((item) => {
				const active = pathname.startsWith(item.href);

				return (
					<Link key={item.href} href={item.href} className={`${s.link} ${active ? s.active : ''}`} aria-current={active ? 'page' : undefined}>
						{item.icon}
						{item.label}
					</Link>
				);
			})}

			{isLoaded && !isSignedIn && !MOCK_ACCOUNT ? (
				<Link href="/sign-in" className={`${s.card} ${s.account}`}>
					<span className={s.name}>Đăng nhập</span>
				</Link>
			) : (
				<details key={pathname} className={s.account}>
					<summary className={`${s.card} ${pathname.startsWith('/profile') ? s.current : ''}`}>
						<span className={s.avatar} style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
							{initialsOf(name)}
						</span>
						<span className={s.name}>{name}</span>
						<ChevronUpIcon stroke="#A7ABC0" />
					</summary>
					<div className={s.menu} onClick={(event) => {
						if ((event.target as Element).closest('a')) event.currentTarget.closest('details')?.removeAttribute('open');
					}}>
						<Link href="/profile?tab=profile" className={s.item}>
							<UserIcon stroke="#4A48E8" />
							Hồ sơ
						</Link>
						<Link href="/profile?tab=settings" className={s.item}>
							<GearIcon stroke="#4A48E8" />
							Cài đặt
						</Link>
						<span className={s.divider} />
						<button type="button" className={`${s.item} ${s.logout}`} onClick={() => signOut({ redirectUrl: '/onboarding' })}>
							<LogoutIcon stroke="#C23B19" />
							Đăng xuất
						</button>
					</div>
				</details>
			)}
		</nav>
	);
}
