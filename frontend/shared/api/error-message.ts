type ApiErrorResponse = {
	response?: {
		data?: {
			message?: string | string[];
			detail?: string | string[];
		};
		status?: number;
	};
};

function getApiErrorResponse(error: unknown): ApiErrorResponse | null {
	if (typeof error !== 'object' || error === null || !('response' in error)) {
		return null;
	}

	return error as ApiErrorResponse;
}

function getRawApiErrorMessage(error: unknown) {
	const data = getApiErrorResponse(error)?.response?.data;
	const message = data?.message ?? data?.detail;

	if (Array.isArray(message)) {
		return message[0] ?? '';
	}

	return typeof message === 'string' ? message : '';
}

export function getApiErrorMessage(error: unknown, fallback: string) {
	const message = getRawApiErrorMessage(error);
	if (message.trim()) {
		return message;
	}

	if (error instanceof Error && error.message.trim()) {
		return error.message;
	}

	return fallback;
}

