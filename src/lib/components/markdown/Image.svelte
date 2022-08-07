<script lang="ts">
	import { getContext } from 'svelte';
	import { key, useMarkdownComponent } from '$lib/helpers/markdown';
	import type { MarkdownContext } from '$lib/typings/markdown';
	import { getFormattedUrl } from '$lib/helpers/dom';

	export let element: HTMLImageElement;

	const context = getContext<MarkdownContext>(key);
	const store = useMarkdownComponent(context, () => element);

	$: store.handleChange(element);
</script>

{#if $store.completed}
	<img src={element.src} alt={element.alt} class="mx-auto my-2" />
{:else}
	<span
		aria-label={element.alt}
		class="border-r-odp-fg pr-0.5 w-fit"
		class:markdown-blink={$store.started && !$store.completed}
	>
		{$store.written}
	</span>
{/if}
