'use client';

import { useAuth } from '@clerk/nextjs';
import { setClerkToken } from '@/shared/api/client';


export function useApi() {
	const { getToken } = useAuth();

	setClerkToken(getToken);
}
