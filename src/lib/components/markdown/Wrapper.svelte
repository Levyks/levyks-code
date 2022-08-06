<script lang="ts">
	import { onMount, setContext } from 'svelte';

	import { key } from '$lib/helpers/markdown';
	import type { MarkdownChild, MarkdownContext } from '$lib/typings/markdown';

	export let interval: number = 100;
	let className: string = '';

	setContext<MarkdownContext>(key, {
		addChild
	});

	let children: MarkdownChild[] = [];
	function addChild(child: MarkdownChild) {
		children = children.concat(child);
	}

	async function write() {
		console.log('children', children);
		for (const child of children) {
			if (child.isCompleted()) continue;
			await child.write(interval);
		}
	}

	onMount(write);

	export { className as class };
</script>

<div class={className}>
	<slot />
</div>
