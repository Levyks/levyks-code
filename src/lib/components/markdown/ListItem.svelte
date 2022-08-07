<script lang="ts">
	import { createParagraph } from '$lib/helpers/dom';

	import ComponentWrapper from './ComponentWrapper.svelte';

	export let element: HTMLLIElement;

	function getChildElement(child: ChildNode): HTMLElement {
		if (child instanceof Text) {
			return createParagraph(child.textContent ?? '');
		}
		return child as HTMLElement;
	}
</script>

<li>
	{#each element.childNodes as child}
		<ComponentWrapper element={getChildElement(child)} fixed={true} />
	{/each}
</li>
