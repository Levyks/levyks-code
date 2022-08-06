<script lang="ts">
	import type { HeadingLevel } from '$lib/typings/misc';

	export let level: HeadingLevel;
	export let ariaLabel: string | undefined = undefined;
	let className: string = '';

	export { className as class };
</script>

{#if level === 1}
	<h1 class={className} aria-label={ariaLabel}><slot /></h1>
{:else if level === 2}
	<h2 class={className} aria-label={ariaLabel}><slot /></h2>
{:else if level === 3}
	<h3 class={className} aria-label={ariaLabel}><slot /></h3>
{:else if level === 4}
	<h4 class={className} aria-label={ariaLabel}><slot /></h4>
{:else if level === 5}
	<h5 class={className} aria-label={ariaLabel}><slot /></h5>
{:else if level === 6}
	<h6 class={className} aria-label={ariaLabel}><slot /></h6>
{/if}
