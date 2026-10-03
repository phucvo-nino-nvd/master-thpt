import { isAxiosError } from 'axios';

type ApiErrorResponse = {
	response?: {
		data?: {
			message?: string | string[];
			detail?: string | string[];
		};
	};
};

export function getApiErrorMessage(error: unknown, fallback: string) {
	if (typeof error === 'object' && error !== null && 'response' in error) {
		const data = (error as ApiErrorResponse).response?.data;
		const raw = data?.message ?? data?.detail;
		const message = Array.isArray(raw) ? raw[0] : raw;
		if (typeof message === 'string' && message.trim()) return message;
	}

	if (error instanceof Error && !isAxiosError(error) && error.message.trim()) {
		return error.message;
	}

	return fallback;
}
