<script lang="ts">
	import FileComp from './File.svelte';
	import FolderComp from './Folder.svelte';

	import { DirElementType } from '$lib/enums/dir';
	import type { DirElementStore, File, Folder } from '$lib/typings/directories';

	export let element: DirElementStore;
	export let indent: number = 0;

	const asFile = (element: DirElementStore) => element as DirElementStore<File>;
	const asFolder = (element: DirElementStore) => element as DirElementStore<Folder>;
</script>

{#if $element.type === DirElementType.File}
	<FileComp file={asFile(element)} indent={indent + 1} />
{:else if $element.type === DirElementType.Folder}
	<FolderComp folder={asFolder(element)} {indent} />
{/if}
