import { writable } from 'svelte/store';

import { Home as HomeIcon } from 'svelte-hero-icons';
import { solidHeroIcon } from '$lib/helpers/icons';
import { DirElementType } from '$lib/enums/dir';
import type { DirElement, Folder, File, DirElementStore, IconDef } from '$lib/typings/directories';
import type { MarkdownImporterDict } from '$lib/typings/misc';

export const tree: DirElementStore[] = [
	folder('dir.projects', [file('testing', solidHeroIcon(HomeIcon, 'text-amber-400'), {})]),
	file('dir.home', solidHeroIcon(HomeIcon, 'text-green-400'), {
		en: () => import('$lib/content/home/en.md'),
		pt: () => import('$lib/content/home/pt.md')
	})
];

function createStore<T extends DirElement>(data: T): DirElementStore<T> {
	const { set, update, subscribe } = writable(data);

	function setParent(parent: DirElementStore<Folder>) {
		update((d) => {
			d.parent = parent;
			return d;
		});
	}

	return {
		set,
		update,
		subscribe,
		setParent
	};
}

function folder(name: string, children: DirElementStore[]): DirElementStore<Folder> {
	const store = createStore<Folder>({
		type: DirElementType.Folder,
		name,
		open: false,
		children
	});

	children.forEach((child) => child.setParent(store));

	return store;
}

function file(
	name: string,
	icon: IconDef,
	markdownImporterDict: MarkdownImporterDict
): DirElementStore<File> {
	return createStore<File>({
		type: DirElementType.File,
		name,
		icon,
		markdownImporterDict,
		markdownHtmlDict: {}
	});
}
