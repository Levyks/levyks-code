import i18n, { type Config } from 'sveltekit-i18n';

const config: Config = {
	loaders: [
		{
			locale: 'en',
			key: 'common',
			loader: () => import('./en.yaml').then((m) => m.default)
		},
		{
			locale: 'pt',
			key: 'common',
			loader: () => import('./pt.yaml').then((m) => m.default)
		}
	]
};

export function getDefaultLocale(acceptLanguage: string) {
	const validLocales = config.loaders?.map((l) => l.locale) ?? [];

	const acceptedLocales = acceptLanguage.split(',').map((l) => l.split(';')[0].trim());

	for (const locale of acceptedLocales) {
		if (validLocales.includes(locale)) {
			return locale;
		}
	}

	return 'en';
}

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
