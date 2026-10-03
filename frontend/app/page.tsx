import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { MOCK_ACCOUNT } from '@/shared/api/client';

export default async function HomePage() {
	const { userId } = await auth();
	redirect(MOCK_ACCOUNT || userId ? '/today' : '/onboarding');
}
