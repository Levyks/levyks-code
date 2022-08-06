<script lang="ts">
	import Spinner from './Spinner.svelte';
	import Icon from './Icon.svelte';
	import { solidHeroIcon } from '$lib/helpers/icons';
	import { ExclamationCircle } from 'svelte-hero-icons';
	import type { File } from '$lib/typings/directories';
	import type { ComponentConstructor } from '$lib/typings/misc';
	import type { Writable } from 'svelte/store';

	export let fileStore: Writable<File | null>;

	let component: ComponentConstructor | undefined;
	let loading: boolean;
	let error: boolean;

	$: loadComponent($fileStore);

	async function loadComponent(file: File | null) {
		error = false;

		if (!file) {
			component = undefined;
			return;
		}

		if (file.component) {
			component = file.component;
			return;
		}

		loading = true;
		try {
			component = await file.componentImporter().then((m) => m.default);
			fileStore.update((f) => {
				f!.component = component;
				return f;
			});
		} catch (e) {
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
		<svelte:component this={component} />
	{/if}
</div>
