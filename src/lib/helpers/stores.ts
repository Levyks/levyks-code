import type { Writable } from 'svelte/store';

export function createGetter<T>(subscribe: Writable<T>['subscribe']): () => T {
	return () => {
		let value;
		subscribe((_) => (value = _))();
		return value as unknown as T;
	};
}
