<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { HeadingLevel } from '$lib/typings/misc';

	export let level: HeadingLevel = 1;
	export let content: string;
	export let interval: number = 100;

	let typed: string = '';
	let toType: string;
	let intervalResult: NodeJS.Timer;
	let finished = false;

	const sizes = ['text-4xl', 'text-3xl', 'text-2xl', 'text-xl', 'text-lg', 'text-md'];

	$: handleChange(content, level);

	function handleChange(content: string, level: HeadingLevel) {
		clearInterval(intervalResult);
		typed = '';
		toType = '#'.repeat(level) + ' ' + content;
		finished = false;
		intervalResult = setInterval(typeLetter, interval);
	}

	function handleFinished() {
		clearInterval(intervalResult);
		typed = content;
		finished = true;
	}

	function typeLetter() {
		if (typed.length === toType.length) {
			handleFinished();
			return;
		}

		typed += toType[typed.length];
	}

	onDestroy(() => {
		clearInterval(intervalResult);
	});
</script>

<div
	role="heading"
	aria-level={level}
	aria-label={content}
	class="border-r-odp-fg pr-0.5 w-fit {finished ? sizes[level] : ''}"
	class:blink={!finished}
	class:font-bold={finished}
>
	{typed}
</div>

<style>
	.blink {
		animation: blink-cursor 0.75s step-end infinite;
	}

	@keyframes blink-cursor {
		from,
		to {
			border-right: none;
		}
		50% {
			border-right: 1px solid;
		}
	}
</style>
