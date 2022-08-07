<script lang="ts">
	import { key, useMarkdownComponent } from '$lib/helpers/markdown';
	import type { MarkdownContext } from '$lib/typings/markdown';

	import { getContext } from 'svelte';

	export let element: HTMLParagraphElement;
	export let fixed: boolean = false;

	const context = getContext<MarkdownContext>(key);
	const store = useMarkdownComponent(context, () => element, fixed);

	$: store.handleChange(element);
</script>

{#if fixed || $store.completed}
	<span class="border-r-odp-fg pr-0.5 w-fit">
		{element.textContent}
	</span>
{:else}
	<span
		aria-label={element.textContent ?? ''}
		class="border-r-odp-fg pr-0.5 w-fit"
		class:markdown-blink={$store.started}
	>
		{$store.written}
	</span>
{/if}
