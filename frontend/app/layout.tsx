import type { Metadata } from 'next';
import { DM_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
import { AccountProvider } from '@/components/account-provider';
import { ClerkProviderClient } from '@/components/clerk-provider';
import { ProcessingProvider } from '@/components/processing-provider';
import 'katex/dist/katex.min.css';
import './globals.css';

const sans = Plus_Jakarta_Sans({
	subsets: ['latin', 'vietnamese'],
	weight: ['400', '500', '600', '700', '800'],
	variable: '--font-sans',
	display: 'swap',
});

const mono = DM_Mono({
	subsets: ['latin'],
	weight: ['400', '500'],
	variable: '--font-mono',
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'MASTER THPT',
	description: 'Luyện thi THPT môn Toán mỗi ngày một chút',
	icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="vi" className={`${sans.variable} ${mono.variable}`}>
			<body>
				<ClerkProviderClient>
					<AccountProvider><ProcessingProvider>{children}</ProcessingProvider></AccountProvider>
				</ClerkProviderClient>
				<Script src="/rive-slot.js" strategy="afterInteractive" />
			</body>
		</html>
	);
}
