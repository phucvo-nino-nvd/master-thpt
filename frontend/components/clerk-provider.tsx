'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { useApi } from '@/lib/api';


function ClerkApiToken() {
	useApi();

	return null;
}


export function ClerkProviderClient({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClerkProvider>
			<ClerkApiToken />
			{children}
		</ClerkProvider>
	);
}
