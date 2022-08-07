<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { X as CloseIcon } from 'svelte-hero-icons';

	import Icon from '$lib/components/misc/Icon.svelte';
	import { currentTab, tabs } from '$lib/stores/tabs';
	import { solidHeroIcon } from '$lib/helpers/icons';

	import type { File } from '$lib/typings/directories';

	export let file: File;

	function handleClick() {
		if ($currentTab !== file) $currentTab = file;
	}

	function handleClose() {
		const idx = $tabs.findIndex((tab) => tab === file);

		if (idx !== -1)
			tabs.update((array) => {
				array.splice(idx, 1);
				return array;
			});

		if ($currentTab !== file) return;

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
	on:click={handleClick}
>
	<Icon def={file.icon} />
	<span class="mx-1">{$_(file.translationKey)}</span>
	<button class="hover:bg-odp-light-bg p-0.5 rounded" on:click={handleClose}>
		<Icon def={solidHeroIcon(CloseIcon)} />
	</button>
</div>
