<script lang="ts">
	import { getContext } from 'svelte';
	import { key, useMarkdownComponent } from '$lib/helpers/markdown';
	import { parseCustomComponent } from '$lib/helpers/dom';

	import MyAge from './custom/MyAge.svelte';

	import type { MarkdownContext } from '$lib/typings/markdown';
	import type { ComponentConstructor } from '$lib/typings/misc';

	export let element: HTMLAnchorElement;
	let componentName: string | undefined;
	let args: Record<string, string> | undefined;

	$: {
		({ componentName, args } = parseCustomComponent(element));
	}

	const context = getContext<MarkdownContext>(key);
	const store = useMarkdownComponent(context, () => element);

	const customComponents: Record<string, ComponentConstructor> = {
		MyAge
	};

	$: store.handleChange(element);
</script>

{#if $store.completed}
	<svelte:component this={componentName && customComponents[componentName]} {...args} />
{:else}
	<span
		aria-label={componentName}
		class="border-r-odp-fg pr-0.5 w-fit"
		class:markdown-blink={$store.started && !$store.completed}
	>
		{$store.written}
	</span>
{/if}
