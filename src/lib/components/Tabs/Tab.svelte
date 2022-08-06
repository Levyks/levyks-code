<script lang="ts">
	import { X as CloseIcon } from 'svelte-hero-icons';

	import Icon from '$lib/components/misc/Icon.svelte';
	import { currentTab, tabs } from '$lib/stores/tabs';
	import { solidHeroIcon } from '$lib/helpers/icons';

	import type { File } from '$lib/typings/directories';

	export let file: File;

	function handleClose() {
		const idx = $tabs.findIndex((tab) => tab === file);

		if (idx !== -1)
			tabs.update((array) => {
				array.splice(idx, 1);
				return array;
			});

		if (!$tabs.length) $currentTab = null;
		else if (idx > 0) $currentTab = $tabs[idx - 1];
		else $currentTab = $tabs[0];
	}

	function handleMouseDown(e: MouseEvent) {
		if (e.button === 1) handleClose();
	}
</script>

<div
	class="p-3 border-black border-r-2 border-b cursor-pointer flex items-center"
	class:bg-odp-dark-bg={$currentTab !== file}
	class:bg-odp-bg={$currentTab === file}
	on:mousedown={handleMouseDown}
	on:click={() => currentTab.set(file)}
>
	<Icon def={file.icon} />
	<span class="mx-1">{file.name}</span>
	<button class="hover:bg-odp-light-bg p-0.5 rounded" on:click={handleClose}>
		<Icon def={solidHeroIcon(CloseIcon)} />
	</button>
</div>
