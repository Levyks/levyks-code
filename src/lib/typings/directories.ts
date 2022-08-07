import type { DirElementType } from '$lib/enums/dir';
import type { Writable } from 'svelte/store';
import type { ComponentConstructor, MarkdownImporterDict } from './misc';

export interface DirElement {
	type: DirElementType;
	name: string;
	parent?: DirElementStore<Folder>;
}

export interface DirElementStore<T extends DirElement = DirElement> extends Writable<T> {
	setParent(parent: Writable<Folder>): void;
}

export interface IconDef<Props = Record<string, unknown>> {
	component: ComponentConstructor<Props>;
	props: Props;
}

export interface File extends DirElement {
	type: DirElementType.File;
	icon: IconDef;
	markdownImporterDict: MarkdownImporterDict;
	markdownHtmlDict: Record<string, HTMLElement[]>;
}

export interface Folder extends DirElement {
	type: DirElementType.Folder;
	open: boolean;
	children: DirElementStore[];
}
