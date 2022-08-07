<script lang="ts">
	import { key, useMarkdownComponent } from '$lib/helpers/markdown';
	import type { MarkdownContext } from '$lib/typings/markdown';

	import { getContext } from 'svelte';
	import ListItem from './ListItem.svelte';

	export let element: HTMLUListElement;

	const context = getContext<MarkdownContext>(key);
	const store = useMarkdownComponent(context, () => element);

	const asLi = (child: Element) => child as HTMLLIElement;

	$: store.handleChange(element);
</script>

{#if $store.completed}
	<ul class="list-disc ml-5 mb-4">
		{#each element.children as child}
			<ListItem element={asLi(child)} />
		{/each}
	</ul>
{:else}
	<p aria-label={element.textContent ?? ''} class="w-fit">
		{#each $store.written.split('\n') as line}
			{line}
			<br />
		{/each}
	</p>
{/if}
