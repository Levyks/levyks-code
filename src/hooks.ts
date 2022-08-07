import type { RequestEvent } from '@sveltejs/kit';

export function getSession(event: RequestEvent) {
	return {
		acceptLanguage: event.request.headers.get('Accept-Language')
	};
}
