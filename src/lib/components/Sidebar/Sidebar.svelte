<script lang="ts">
	import { DocumentDuplicate, Cog } from 'svelte-hero-icons';
	import type { IconSource } from 'svelte-hero-icons';

	import IconButton from './IconButton.svelte';
	import Sidepanel from '$lib/enums/sidepanel';
	import { currentSidepanel } from '$lib/stores/sidepanel';

	type ButtonDefinition = {
		icon: IconSource;
		target: Sidepanel;
	};

	let buttons: ButtonDefinition[];
	$: buttons = [
		{
			icon: DocumentDuplicate,
			target: Sidepanel.Files
		},
		{
			icon: Cog,
			target: Sidepanel.Settings
		}
	];
</script>

<div class="h-fill w-12">
	{#each buttons as button}
		<IconButton
			icon={button.icon}
			selected={$currentSidepanel === button.target}
			on:click={() => currentSidepanel.set(button.target)}
		/>
	{/each}
</div>
