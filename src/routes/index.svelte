<script>
	import ViewLoader from '$lib/components/misc/ViewLoader.svelte';
	import Sidebar from '$lib/components/Sidebar';
	import Sidepanel from '$lib/components/Sidepanel';
	import Tabs from '$lib/components/Tabs';
	import { currentTab } from '$lib/stores/tabs';
</script>

<svelte:head>
	<title>Levy Barbosa</title>
</svelte:head>

<div class="h-full bg-odp-bg text-odp-fg flex font-mono">
	<Sidebar />
	<Sidepanel />
	<main class="flex-grow flex flex-col">
		<Tabs />
		{#if $currentTab}
			<ViewLoader fileStore={currentTab} />
		{/if}
	</main>
</div>
