import { Icon, type IconSource } from 'svelte-hero-icons';
import type { IconDef } from '$lib/typings/directories';

export function heroIcon(
	src: IconSource,
	class_?: string,
	size?: string,
	solid?: boolean
): IconDef {
	size = size || '1rem';
	return {
		component: Icon,
		props: { src, class: class_, size, solid }
	};
}

export function solidHeroIcon(src: IconSource, class_?: string, size?: string): IconDef {
	return heroIcon(src, class_, size, true);
}
