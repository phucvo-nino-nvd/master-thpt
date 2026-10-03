'use client';

import { viVN } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import { useSyncClerkToken } from '@/lib/api';

const CHUNKY = { borderRadius: '16px', fontWeight: 800, letterSpacing: '0.04em', transition: 'transform 0.1s, box-shadow 0.1s' };

const LOCALIZATION = {
	...viVN,
	signIn: { ...viVN.signIn, start: { ...viVN.signIn?.start, title: 'Đăng nhập', subtitle: 'Học tiếp lộ trình Toán của em' } },
	signUp: { ...viVN.signUp, start: { ...viVN.signUp?.start, title: 'Tạo hồ sơ', subtitle: 'Lưu lửa, XP và lộ trình của em' } },
};

const APPEARANCE = {
	variables: {
		colorPrimary: '#4a48e8',
		colorText: '#111319',
		colorTextSecondary: '#4d5362',
		colorBackground: '#ffffff',
		colorInputBackground: '#ffffff',
		colorInputText: '#111319',
		colorDanger: '#c23b19',
		colorSuccess: '#0b8c4b',
		fontFamily: 'var(--sans)',
		borderRadius: '14px',
		fontSize: '15px',
	},
	elements: {
		rootBox: { width: '100%' },
		cardBox: { width: '100%', border: '2px solid #ecedf2', borderRadius: '28px', boxShadow: '0 6px 0 #ecedf2' },
		card: { padding: '32px 28px 24px', boxShadow: 'none', border: 0, borderRadius: 0 },
		headerTitle: { font: '800 26px/1.15 var(--sans)', letterSpacing: '-0.03em' },
		headerSubtitle: { color: '#787d8d', fontWeight: 600 },
		socialButtonsBlockButton: { ...CHUNKY, height: '50px', boxShadow: 'inset 0 0 0 2px #ecedf2, 0 4px 0 #ecedf2 !important', color: '#333742', '&:active': { transform: 'translateY(4px)', boxShadow: 'none !important' } },
		socialButtonsBlockButtonText: { fontWeight: 800 },
		dividerLine: { height: '2px', background: '#f0f1f7' },
		dividerText: { color: '#787d8d', fontWeight: 700 },
		formFieldLabel: { color: '#333742', fontWeight: 800, fontSize: '13px' },
		formFieldInput: { height: '48px', borderRadius: '14px', boxShadow: 'inset 0 0 0 2px #ecedf2 !important', fontWeight: 600, '&:focus': { boxShadow: 'inset 0 0 0 2px #4a48e8 !important' } },
		formButtonPrimary: { ...CHUNKY, height: '52px', background: '#4a48e8', backgroundImage: 'none', border: 0, boxShadow: '0 5px 0 #3230b8 !important', '&::after': { display: 'none' }, fontSize: '15px', textTransform: 'uppercase', '&:hover': { background: '#4a48e8' }, '&:active': { transform: 'translateY(5px)', boxShadow: 'none !important' } },
		otpCodeFieldInput: { borderRadius: '12px', boxShadow: 'inset 0 0 0 2px #ecedf2 !important', fontWeight: 800 },
		footer: { background: '#fbfbf8', borderTop: '2px solid #f0f1f7' },
		footerActionText: { fontWeight: 600 },
		footerActionLink: { color: '#4a48e8', fontWeight: 800, '&:hover': { color: '#3230b8' } },
		identityPreview: { border: '2px solid #ecedf2', borderRadius: '14px' },
		identityPreviewEditButton: { color: '#4a48e8' },
		alert: { borderRadius: '14px' },
	},
};

function ClerkApiToken() {
	useSyncClerkToken();

	return null;
}

export function ClerkProviderClient({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClerkProvider localization={LOCALIZATION} appearance={APPEARANCE}>
			<ClerkApiToken />
			{children}
		</ClerkProvider>
	);
}
