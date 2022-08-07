import { sveltekit } from '@sveltejs/kit/vite';
import yaml from '@rollup/plugin-yaml';

import * as mdPlugin from 'vite-plugin-markdown';
import MarkdownIt from 'markdown-it';

import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [
		sveltekit(),
		yaml(),
		mdPlugin.plugin({
			mode: [mdPlugin.Mode.HTML],
			markdownIt: new MarkdownIt({
				breaks: true
			})
		})
	]
};

export default config;
