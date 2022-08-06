<script lang="ts">
	import { key } from '$lib/helpers/markdown';
	import type { HeadingDepth, MarkdownContext } from '$lib/typings/markdown';

	import { getContext } from 'svelte';

	export let depth: HeadingDepth = 1;
	export let content: string;

	let intervalTimer: NodeJS.Timer;
	let started = false;
	let completed = false;
	let written: string = '';
	let target: string;
	let interval: number;
	let resolveCompletion: () => void;

	function write(intervalMS: number) {
		interval = intervalMS;
		started = true;
		if (completed) return Promise.resolve();
		return new Promise<void>((resolve) => {
			resolveCompletion = resolve;
			handleChange(content, depth);
		});
	}

	function handleChange(content: string, depth: HeadingDepth) {
		if (!started) return;
		clearInterval(intervalTimer);
		written = '';
		target = '#'.repeat(depth) + ' ' + content;
		completed = false;
		intervalTimer = setInterval(typeLetter, interval);
	}

	function typeLetter() {
		if (written === target) {
			completed = true;
			written = content;
			if (resolveCompletion) resolveCompletion();
			clearInterval(intervalTimer);
			return;
		}
		written += target[written.length];
	}

	$: handleChange(content, depth);

	const sizes = ['text-4xl', 'text-3xl', 'text-2xl', 'text-xl', 'text-lg', 'text-md'];

	const context = getContext<MarkdownContext>(key);
	context.addChild({
		isCompleted: () => completed,
		write
	});
</script>

<div
	role="heading"
	aria-level={depth}
	aria-label={content}
	class="border-r-odp-fg pr-0.5 w-fit {completed ? sizes[depth] : ''}"
	class:markdown-blink={started && !completed}
	class:font-bold={completed}
>
	{written}
</div>
