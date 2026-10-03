import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const MOCK_ACCOUNT = process.env.MOCK_ACCOUNT?.toLowerCase() === 'true';
const isPublic = createRouteMatcher(['/', '/onboarding(.*)', '/exams(.*)', '/guest(.*)', '/rive(.*)', '/sign-in(.*)', '/sign-up(.*)', '/api(.*)', '/__clerk(.*)']);

export default clerkMiddleware(async (auth, req) => {
	if (MOCK_ACCOUNT || isPublic(req)) return;
	if (!(await auth()).userId) return NextResponse.redirect(new URL('/onboarding', req.url));
});

export const config = {
	matcher: [
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		'/(api|trpc)(.*)',
		'/__clerk/(.*)',
	],
};
