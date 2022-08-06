import type { HeadingDepth } from '$lib/typings/markdown';

export const key = Symbol();

function createParagraph(text: string): HTMLParagraphElement {
	const el = document.createElement('p');
	el.textContent = text;
	return el;
}

function flattenParagraph(p: HTMLParagraphElement): HTMLElement[] {
	const elements: HTMLElement[] = [];

	for (const child of p.childNodes) {
		if (child.nodeType === Node.TEXT_NODE && child.textContent?.trim()) {
			elements.push(createParagraph(child.textContent));
		} else {
			elements.push(child as HTMLElement);
		}
	}

	return elements;
}

export function getHeadingDepth(heading: HTMLHeadingElement): HeadingDepth {
	return parseInt(heading.tagName.slice(1)) as HeadingDepth;
}

export function parseMarkdownHtml(html: string): HTMLElement[] {
	const dom = document.createElement('div');
	dom.innerHTML = html;

	const elements: HTMLElement[] = [];

	for (const child of dom.children) {
		if (child instanceof HTMLParagraphElement) {
			elements.push(...flattenParagraph(child));
		} else {
			elements.push(child as HTMLElement);
		}
	}

	return elements;
}
