<script lang="ts">
	import { onMount, setContext } from 'svelte';

	import { key } from '$lib/helpers/markdown';

	import ComponentWrapper from './ComponentWrapper.svelte';

	import type { MarkdownChild, MarkdownContext } from '$lib/typings/markdown';

	export let elements: HTMLElement[];

	let wrapperDiv: HTMLDivElement;
	let className: string = '';
	let mounted = false;

	let children: MarkdownChild[] = [];
	setContext<MarkdownContext>(key, {
		addChild: (child: MarkdownChild) => children.push(child),
		getWrapper: () => wrapperDiv
	});

	async function write() {
		for (const child of children) {
			if (child.isCompleted()) continue;
			await child.write();
			if (!mounted) break;
			child.getElement().setAttribute('data-completed', '1');
		}
	}

	onMount(() => {
		mounted = true;
		write();
		return () => {
			mounted = false;
		};
	});

	export { className as class };
</script>

<div class={className} bind:this={wrapperDiv}>
	{#each elements as element}
		<ComponentWrapper {element} />
	{/each}
</div>
