<script context="module" lang="ts">
	import type { LoadEvent } from '@sveltejs/kit';

	import { locale, loadTranslations, getDefaultLocale } from '$lib/i18n';

	export const load = async (props: LoadEvent) => {
		const pathname = props.url.pathname;

		const initLocale = locale.get() || getDefaultLocale(props.session.acceptLanguage);

		await loadTranslations(initLocale, pathname); // keep this just before the `return`

		return {};
	};
</script>

<script>
	import '../app.css';
</script>

<slot />
