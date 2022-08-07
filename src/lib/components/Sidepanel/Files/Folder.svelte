<script lang="ts">
	import ElementPicker from './ElementPicker.svelte';

	import {
		Icon,
		Folder as FolderIcon,
		FolderOpen as FolderOpenIcon,
		ChevronRight
	} from 'svelte-hero-icons';

	import GenericListing from './GenericListing.svelte';

	import { solidHeroIcon } from '$lib/helpers/icons';
	import type { DirElementStore, Folder } from '$lib/typings/directories';

	export let folder: DirElementStore<Folder>;
	export let indent: number = 0;

	function handleClick() {
		$folder.open = !$folder.open;
	}
</script>

<GenericListing
	translationKey={$folder.translationKey}
	icon={$folder.open
		? solidHeroIcon(FolderOpenIcon, 'text-amber-400')
		: solidHeroIcon(FolderIcon, 'text-amber-400')}
	{indent}
	on:click={handleClick}
>
	<div class="chevron-wrapper" class:open={$folder.open}>
		<Icon src={ChevronRight} class="w-4" />
	</div>
</GenericListing>

{#if $folder.open}
	{#each $folder.children as element}
		<ElementPicker {element} indent={indent + 1} />
	{/each}
{/if}

<style>
	.chevron-wrapper {
		transition: transform 0.2s ease-in-out;
	}

	.chevron-wrapper.open {
		transform: rotate(90deg);
	}
</style>
