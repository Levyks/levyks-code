import { writable } from 'svelte/store';

import {
	Home as HomeIcon,
	InformationCircle as InfoIcon,
	MusicNote as MusicNoteIcon
} from 'svelte-hero-icons';
import { solidHeroIcon } from '$lib/helpers/icons';
import { DirElementType } from '$lib/enums/dir';
import type { DirElement, Folder, File, DirElementStore, IconDef } from '$lib/typings/directories';
import type { MarkdownImporterDict } from '$lib/typings/misc';

export const tree: DirElementStore[] = [
	folder('dir.projects', [
		file('dir._projects.songquiz', solidHeroIcon(MusicNoteIcon, 'text-blue-300'), {
			en: () => import('$lib/content/projects/songquiz/en.md'),
			pt: () => import('$lib/content/projects/songquiz/pt.md')
		})
	]),
	file('dir.home', solidHeroIcon(HomeIcon, 'text-green-400'), {
		en: () => import('$lib/content/home/en.md'),
		pt: () => import('$lib/content/home/pt.md')
	}),
	file('dir.aboutThisWebsite', solidHeroIcon(InfoIcon, 'text-blue-400'), {
		en: () => import('$lib/content/about-this-website/en.md'),
		pt: () => import('$lib/content/about-this-website/pt.md')
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

function folder(translationKey: string, children: DirElementStore[]): DirElementStore<Folder> {
	const store = createStore<Folder>({
		type: DirElementType.Folder,
		translationKey,
		open: false,
		children
	});

	children.forEach((child) => child.setParent(store));

	return store;
}

function file(
	translationKey: string,
	icon: IconDef,
	markdownImporterDict: MarkdownImporterDict
): DirElementStore<File> {
	return createStore<File>({
		type: DirElementType.File,
		translationKey,
		icon,
		markdownImporterDict,
		markdownHtmlDict: {}
	});
}
