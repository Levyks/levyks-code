<script lang="ts">
	import { Icon } from 'svelte-hero-icons';
	import type { IconSource } from 'svelte-hero-icons';
	import { createEventDispatcher } from 'svelte';

	export let icon: IconSource;
	export let selected: boolean = false;

	const dispatch = createEventDispatcher<{ click: void }>();
</script>

<button
	class="w-full h-12 flex justify-center items-center text-odp-strong-fg"
	class:selected
	on:click={() => dispatch('click')}
>
	<Icon src={icon} class="h-6" />
</button>

<style>
	button {
		opacity: 0.4;
	}

	button:hover,
	button.selected {
		opacity: 1;
	}

	button.selected {
		border-left: 2px solid;
	}
</style>
