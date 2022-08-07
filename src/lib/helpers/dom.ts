export function createParagraph(text: string): HTMLParagraphElement {
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

	elements.push(document.createElement('br'));

	return elements;
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

export function isCustomComponent(anchor: HTMLAnchorElement): boolean {
	const url = new URL(anchor.href);
	return url.pathname === '/svelte-component';
}

export function parseCustomComponent(anchor: HTMLAnchorElement) {
	const [componentName, argsString] = anchor.textContent?.split('|') ?? [undefined, undefined];

	const args = argsString?.split(';').reduce((acc, arg) => {
		const [key, value] = arg.split('=');
		acc[key] = value;
		return acc;
	}, {} as Record<string, string>);

	return { componentName, args };
}

export function getFormattedUrl(url: string): string {
	const urlObj = new URL(url);
	return location.origin === urlObj.origin ? urlObj.pathname : url;
}
