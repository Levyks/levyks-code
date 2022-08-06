import { writable } from 'svelte/store';
import type { DirElementStore, File, Folder } from '$lib/typings/directories';

export const tabs = writable<File[]>([]);
export const currentTab = writable<File | null>(null);

function recursiveOpen(store: DirElementStore<Folder>) {
	store.update((folder) => {
		folder.open = true;
		if (folder.parent) recursiveOpen(folder.parent);
		return folder;
	});
}

currentTab.subscribe((file) => {
	if (!file) return;
	if (file.parent) recursiveOpen(file.parent);
});
