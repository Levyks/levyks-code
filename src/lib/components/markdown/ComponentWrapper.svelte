<script lang="ts">
	import { isCustomComponent } from '$lib/helpers/dom';

	import Heading from './Heading.svelte';
	import Paragraph from './Paragraph.svelte';
	import Image from './Image.svelte';
	import Link from './Link.svelte';
	import LineBreak from './LineBreak.svelte';
	import UnorderedList from './UnorderedList.svelte';
	import CustomComponent from './CustomComponent.svelte';

	import type { ComponentConstructor } from '$lib/typings/misc';
	import ListItem from './ListItem.svelte';

	export let element: HTMLElement;
	export let fixed: boolean = false;

	type ComponentDefinition = [
		{ new (): HTMLElement },
		ComponentConstructor<{ element?: HTMLElement; fixed?: boolean }>
	];

	const components: ComponentDefinition[] = [
		[HTMLHeadingElement, Heading],
		[HTMLParagraphElement, Paragraph],
		[HTMLImageElement, Image],
		[HTMLAnchorElement, Link],
		[HTMLUListElement, UnorderedList],
		[HTMLLIElement, ListItem],
		[HTMLBRElement, LineBreak]
	];

	function getComponent(
		element: HTMLElement
	): ComponentConstructor<{ element?: HTMLElement }> | undefined {
		for (const [type, component] of components) {
			if (element instanceof HTMLAnchorElement && isCustomComponent(element)) {
				return CustomComponent;
			}

			if (element instanceof type) {
				return component;
			}
		}
	}
</script>

<svelte:component this={getComponent(element)} {element} {fixed} />
