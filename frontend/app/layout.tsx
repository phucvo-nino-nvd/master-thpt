import type { Metadata } from 'next';
import { Inter, Literata } from 'next/font/google';
import Script from 'next/script';
import 'katex/dist/katex.min.css';
import './globals.css';

const inter = Inter({
	subsets: ['latin', 'vietnamese'],
	display: 'swap',
});

const literata = Literata({
	subsets: ['latin', 'vietnamese'],
	display: 'swap',
	variable: '--font-reading',
});

export const metadata: Metadata = {
	title: 'MASTER THPT',
	description: 'Auth flow for MASTER THPT',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} ${literata.variable}`}>
				<Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
				{children}
			</body>
		</html>
	);
}
