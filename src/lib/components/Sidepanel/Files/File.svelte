<script lang="ts">
	import GenericListing from './GenericListing.svelte';
	import type { DirElementStore, File } from '$lib/typings/directories';
	import { currentTab, tabs } from '$lib/stores/tabs';

	export let file: DirElementStore<File>;
	export let indent: number = 0;

	function handleClick() {
		if ($currentTab === $file) return;
		if (!$tabs.some((tab) => tab === $file)) {
			tabs.update((t) => t.concat($file));
		}
		currentTab.set($file);
	}
</script>

<GenericListing
	translationKey={$file.translationKey}
	icon={$file.icon}
	{indent}
	on:click={handleClick}
	selected={$file === $currentTab}
/>
