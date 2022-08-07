<script lang="ts">
	import { getFormattedUrl } from '$lib/helpers/dom';

	import { key, useMarkdownComponent } from '$lib/helpers/markdown';
	import type { MarkdownContext } from '$lib/typings/markdown';

	import { getContext } from 'svelte';

	export let element: HTMLAnchorElement;
	export let fixed: boolean = false;

	const context = getContext<MarkdownContext>(key);
	const store = useMarkdownComponent(context, () => element);

	$: store.handleChange(element);
</script>

{#if fixed || $store.completed}
	<a class="underline text-blue-500 hover:text-blue-300" href={element.href} target="_blank"
		>{element.textContent}</a
	>
{:else}
	<span
		aria-label={element.textContent ?? ''}
		class="border-r-odp-fg pr-0.5 w-fit"
		class:markdown-blink={$store.started && !$store.completed}
	>
		{$store.written}
	</span>
{/if}
