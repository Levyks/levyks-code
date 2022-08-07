<script lang="ts">
	import { getContext } from 'svelte';
	import { key, useMarkdownComponent, getHeadingDepth } from '$lib/helpers/markdown';
	import type { HeadingDepth, MarkdownContext } from '$lib/typings/markdown';

	export let element: HTMLHeadingElement;
	let depth: HeadingDepth;
	$: depth = getHeadingDepth(element);

	const context = getContext<MarkdownContext>(key);
	const store = useMarkdownComponent(context, () => element);

	$: store.handleChange(element);

	const sizes = ['text-4xl', 'text-3xl', 'text-2xl', 'text-xl', 'text-lg', 'text-md'];
</script>

<div
	role="heading"
	aria-level={depth}
	aria-label={element.textContent}
	class="border-r-odp-fg pr-0.5 w-fit mb-4 {$store.completed ? sizes[depth] : ''}"
	class:markdown-blink={$store.started && !$store.completed}
	class:font-bold={$store.completed}
>
	{#if $store.completed}
		{element.textContent}
	{:else}
		{$store.written}
	{/if}
</div>
