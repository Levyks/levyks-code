<script context="module" lang="ts">
	import type { LoadEvent } from '@sveltejs/kit';

	import { init, waitLocale } from 'svelte-i18n';
	import { getDefaultLocale } from '$lib/i18n';

	export const load = async (props: LoadEvent) => {
		const initialLocale = getDefaultLocale(props.session.acceptLanguage);

		init({
			// We should have all the keys in all translations, so no need to waste bandwith with a fallback
			fallbackLocale: initialLocale,
			initialLocale
		});

		await waitLocale();

		return {};
	};
</script>

<script>
	import '../app.css';
</script>

<slot />
