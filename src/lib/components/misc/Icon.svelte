<script lang="ts">
	import type { IconDef } from '$lib/typings/directories';

	export let def: IconDef;
</script>

<svelte:component this={def.component} {...def.props} />
