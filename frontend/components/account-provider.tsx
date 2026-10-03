'use client';

import { useUser } from '@clerk/nextjs';
import { createContext, useContext, useState } from 'react';
import { useLoad } from '@/lib/api';
import { Account, AccountUpdate, getAccount, updateAccount } from '@/shared/api/client';

export const AVATARS = [
	['#d9d7ff', '#A8DC2C'],
	['#FFB21E', '#F2542D'],
	['#4A48E8', '#14B866'],
	['#14B866', '#A8DC2C'],
	['#F2542D', '#4A48E8'],
	['#17183A', '#4A48E8'],
];

const NEW_ACCOUNT: Account = {
	name: '',
	grade: null,
	goal: null,
	avatar: 0,
	plan: 'free',
	joined_at: null,
	xp: 0,
	streak: 0,
	kept_today: false,
	week: Array(7).fill(false),
	daily: [],
	gains: [],
	activity: [],
	saved_exam_ids: [],
	settings: { remind: true, sound: true, minutes: 20, daily_goal: 10 },
};

type AccountContextValue = {
	account: Account;
	name: string;
	save: (patch: AccountUpdate) => Promise<void>;
	reload: () => void;
};

const AccountContext = createContext<AccountContextValue>({
	account: NEW_ACCOUNT,
	name: '',
	save: async () => {},
	reload: () => {},
});

export const initialsOf = (name: string) =>
	(name.trim().split(/\s+/).map((word) => word[0]).join('').slice(-2) || '?').toUpperCase();

export function AccountProvider({ children }: Readonly<{ children: React.ReactNode }>) {
	const { user } = useUser();
	const [version, setVersion] = useState(0);
	const { data: account, setData } = useLoad(getAccount, NEW_ACCOUNT, [version]);

	const value: AccountContextValue = {
		account,
		name: account.name || user?.fullName || user?.username || 'bạn',
		save: async (patch) => setData(await updateAccount(patch)),
		reload: () => setVersion((v) => v + 1),
	};

	return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export const useAccount = () => useContext(AccountContext);
