'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { useSyncClerkToken } from '@/lib/api';

function ClerkApiToken() {
	useSyncClerkToken();

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
