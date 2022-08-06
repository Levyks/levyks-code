import { writable } from 'svelte/store';
import Sidepanel from '$lib/enums/sidepanel';

export const currentSidepanel = writable<Sidepanel>(Sidepanel.Files);
