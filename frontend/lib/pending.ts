export const ANSWERS_KEY = 'onboarding-answers';
export const ATTEMPT_KEY = 'onboarding-attempt';

export function readPending<T>(key: string): T | null {
	try {
		return JSON.parse(localStorage.getItem(key) ?? 'null');
	} catch {
		return null;
	}
}

export const writePending = (key: string, value: unknown) => localStorage.setItem(key, JSON.stringify(value));
