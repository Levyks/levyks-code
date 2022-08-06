<script lang="ts">
	import { ChevronDown, Icon } from 'svelte-hero-icons';

	import ElementPicker from './ElementPicker.svelte';

	import { tree } from '$lib/stores/directories';
</script>

<div class="bg-odp-bg p-1 flex items-center">
	<Icon src={ChevronDown} class="w-4 mr-1" />
	<span class="font-bold text-xs">LEVY BARBOSA</span>
</div>

{#each tree as element}
	<ElementPicker {element} />
{/each}
