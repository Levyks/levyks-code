<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { _ } from 'svelte-i18n';

	import Icon from '$lib/components/misc/Icon.svelte';
	import type { IconDef } from '$lib/typings/directories';

	export let name: string;
	export let icon: IconDef;
	export let indent: number = 0;
	export let selected: boolean = false;

	const dispatch = createEventDispatcher<{ click: void }>();
</script>

<div
	class="flex items-center cursor-pointer hover:bg-odp-light-bg"
	class:bg-odp-light2-bg={selected}
	on:click={() => dispatch('click')}
>
	<span style="width: {indent}rem" />
	<slot />
	<Icon def={icon} />
	<span class="ml-1">{$_(name)}</span>
</div>

<style>
</style>
