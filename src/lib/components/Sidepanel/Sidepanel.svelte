<script lang="ts">
	import Sidepanel from '$lib/enums/sidepanel';
	import { currentSidepanel } from '$lib/stores/sidepanel';

	// Probably not wortwhile to lazy import these components
	import Files from './Files';
	import Settings from './Settings';

	const components = {
		[Sidepanel.Files]: Files,
		[Sidepanel.Settings]: Settings
	};
</script>

<div class="bg-odp-dark-bg w-80">
	<svelte:component this={components[$currentSidepanel]} />
</div>
