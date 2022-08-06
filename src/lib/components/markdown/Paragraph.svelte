<script lang="ts">
	import { key } from '$lib/helpers/markdown';
	import type { MarkdownContext } from '$lib/typings/markdown';

	import { getContext } from 'svelte';

	export let content: string;

	let intervalTimer: NodeJS.Timer | null;
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
			handleChange(content);
		});
	}

	function clearIntervalIfExists() {
		if (intervalTimer) {
			clearInterval(intervalTimer);
			intervalTimer = null;
		}
	}

	function handleChange(content: string) {
		clearIntervalIfExists();

		if (!started) return;

		target = content;

		if (completed) {
			written = content;
			return;
		}

		written = '';
		intervalTimer = setInterval(typeLetter, interval);
	}

	function handleCompleted() {
		completed = true;
		clearIntervalIfExists();
		if (resolveCompletion) resolveCompletion();
	}

	function typeLetter() {
		if (written === target) {
			handleCompleted();
			return;
		}
		written += target[written.length];
	}

	$: handleChange(content);

	const context = getContext<MarkdownContext>(key);

	// Tá olhando oq?

	context.addChild({
		isCompleted: () => completed,
		write
	});
</script>

<p
	aria-label={content}
	class="border-r-odp-fg pr-0.5 w-fit"
	class:markdown-blink={started && !completed}
>
	{written}
</p>
