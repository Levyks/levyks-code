<script lang="ts">
	import Heading from '$lib/components/markdown/Heading.svelte';
	import Paragraph from '$lib/components/markdown/Paragraph.svelte';
	import Wrapper from '$lib/components/markdown/Wrapper.svelte';

	import { html } from '$lib/content/home/en.md';
	import { parseMarkdownHtml, getHeadingDepth } from '$lib/helpers/markdown';

	const elements = parseMarkdownHtml(html);
</script>

<Wrapper class="flex-grow self-stretch">
	{#each elements as element}
		{#if element instanceof HTMLHeadingElement}
			<Heading content={element.textContent ?? ''} depth={getHeadingDepth(element)} />
		{:else if element instanceof HTMLParagraphElement}
			<Paragraph content={element.textContent ?? ''} />
		{:else if element instanceof HTMLBRElement}
			<br />
		{/if}
	{/each}
</Wrapper>
