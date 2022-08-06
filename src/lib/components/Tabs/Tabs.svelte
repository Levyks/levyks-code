<script lang="ts">
	import Tab from './Tab.svelte';

	import { tabs } from '$lib/stores/tabs';
</script>

<div class="bg-odp-dark-bg flex">
	{#each $tabs as file}
		<Tab {file} />
	{/each}
</div>
