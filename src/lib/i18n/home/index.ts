import i18n, { type Config } from 'sveltekit-i18n';

export const config: Config = {
	loaders: [
		{
			locale: 'en',
			key: 'home',
			loader: () => import('./en.yaml').then((m) => m.default)
		},
		{
			locale: 'pt-BR',
			key: 'home',
			loader: () => import('./pt-BR.yaml').then((m) => m.default)
		}
	]
};

export default (initLocale) => new i18n({ ...config, initLocale });
