import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('en', () => import('./en.yaml'));
register('pt', () => import('./pt.yaml'));

export function getDefaultLocale(acceptLanguage: string) {
	const validLocales = ['en', 'pt'];

	const acceptedLocales = acceptLanguage.split(',').map((l) => l.split(';')[0].trim());

	for (const locale of acceptedLocales) {
		if (validLocales.includes(locale)) {
			return locale;
		}
	}

	return 'en';
}

/*
if (typeof navigator !== 'undefined') {
	init({
		fallbackLocale: 'en',
		initialLocale: getLocaleFromNavigator()
	});
}
*/
