<script lang="ts">
	import { ExclamationCircle } from 'svelte-hero-icons';
	import { locale } from 'svelte-i18n';

	import Wrapper from '$lib/components/markdown/Wrapper.svelte';
	import Spinner from './Spinner.svelte';
	import Icon from './Icon.svelte';

	import { parseMarkdownHtml } from '$lib/helpers/dom';
	import { solidHeroIcon } from '$lib/helpers/icons';

	import type { File } from '$lib/typings/directories';
	import type { Writable } from 'svelte/store';

	export let fileStore: Writable<File | null>;

	let elements: HTMLElement[];
	let loading: boolean;
	let error: boolean;

	$: loadComponent($fileStore, $locale as string);

	async function loadComponent(file: File | null, locale: string) {
		error = false;

		if (!file) {
			elements = [];
			return;
		}

		if (file.markdownHtmlDict[locale]) {
			elements = file.markdownHtmlDict[locale];
			return;
		}

		loading = true;
		try {
			const markdownImporter = file.markdownImporterDict[locale];
			const html = await markdownImporter().then((module) => module.html);
			elements = parseMarkdownHtml(html);
			fileStore.update((f) => {
				f!.markdownHtmlDict[locale] = elements;
				return f;
			});
		} catch (e) {
			console.error(e);
			error = true;
		} finally {
			loading = false;
		}
	}
</script>

<div class="flex-grow flex flex-col justify-center items-center p-3">
	{#if loading}
		<Spinner class="w-16 h-16 text-odp-light2-bg fill-odp-fg" />
	{:else if error}
		<div class="bg-odp-dark-bg p-5 rounded-xl shadow-xl m-5">
			<div class="flex items-center mb-3">
				<Icon def={solidHeroIcon(ExclamationCircle, 'text-orange-600 mr-3 w-12 h-12')} />
				<h1 class="text-xl font-bold">Error</h1>
			</div>
			<p class="mb-2">Sorry, something went wrong and we couldn't load this file for you</p>
			<div class="flex justify-end">
				<button class="h-10 px-6 font-semibold rounded-md text-odp-bg bg-odp-editor-fg"
					>Try again</button
				>
			</div>
		</div>
	{:else}
		<Wrapper class="flex-grow self-stretch" {elements} />
	{/if}
</div>
