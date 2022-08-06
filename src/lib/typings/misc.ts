import type { SvelteComponentTyped } from 'svelte';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentConstructor<Props = any> = new (...args: any[]) => SvelteComponentTyped<Props>;

export type ComponentImporter = () => Promise<{
	default: ComponentConstructor;
}>;

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
