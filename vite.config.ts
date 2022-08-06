import { sveltekit } from '@sveltejs/kit/vite';
import yaml from '@rollup/plugin-yaml';

import * as mdPlugin from 'vite-plugin-markdown';
import markdownIt from 'markdown-it';
import customBlock from 'markdown-it-custom-block';

console.log('mdPlugin', mdPlugin);

import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [
		sveltekit(),
		yaml(),
		mdPlugin.plugin({
			mode: [mdPlugin.Mode.HTML],
			markdownIt: markdownIt({
				breaks: true
			}).use(customBlock, {
				'svelte-component': (arg) => `<svelte-component name="${arg}"/>`
			})
		})
	]
};

export default config;
