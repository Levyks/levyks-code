import { get_store_value } from 'svelte/internal';
import { writable } from 'svelte/store';
import type { HeadingDepth, MarkdownContext } from '$lib/typings/markdown';
import { getFormattedUrl, isCustomComponent, parseCustomComponent } from './dom';

export const key = Symbol();

export function getHeadingDepth(heading: HTMLHeadingElement): HeadingDepth {
	return parseInt(heading.tagName.slice(1)) as HeadingDepth;
}

const typingSound = typeof Audio !== 'undefined' && new Audio('/audio/typing.ogg');
if (typingSound) {
	typingSound.loop = true;
	typingSound.volume = 0.1;
}

type State = {
	started: boolean;
	completed: boolean;
	written: string;
	target: string;
	intervalTimer?: NodeJS.Timer;
	resolveCompleted?: () => void;
};

export function useMarkdownComponent(
	context: MarkdownContext,
	getElement: () => HTMLElement,
	fixed = false,
	interval = 50
) {
	const store = writable<State>({
		started: false,
		completed: false,
		written: '',
		target: ''
	});

	function write() {
		typingSound?.play();
		return new Promise<void>((resolve) => {
			store.update((state) => {
				state.started = true;
				const element = getElement();

				if (element.hasAttribute('data-completed')) {
					state.completed = true;
				}

				if (state.completed) {
					resolve();
				} else {
					state.resolveCompleted = resolve;
				}
				return state;
			});
			handleChange();
		});
	}

	function handleCompleted(state: State): State {
		typingSound?.pause();
		state = clearIntervalIfExists(state);
		state.completed = true;
		if (state.resolveCompleted) state.resolveCompleted();
		return state;
	}

	function clearIntervalIfExists(state: State): State {
		if (state.intervalTimer) {
			clearInterval(state.intervalTimer);
			state.intervalTimer = undefined;
		}

		return state;
	}

	function typeLetter() {
		store.update((state) => {
			if (state.written === state.target) return handleCompleted(state);
			state.written += state.target[state.written.length];
			return state;
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function handleChange(_?: HTMLElement) {
		store.update((state) => {
			state = clearIntervalIfExists(state);

			if (!state.started) return state;

			state.target = getStringDefinition(getElement());

			if (state.completed) {
				state.written = state.target;
			} else {
				state.written = '';
				state.intervalTimer = setInterval(typeLetter, interval);
			}

			return state;
		});
	}

	if (!fixed)
		context.addChild({
			isCompleted: () => get_store_value(store).completed,
			write,
			getElement
		});

	return { ...store, handleChange };
}

export function getStringDefinition(el: HTMLElement): string {
	if (el instanceof HTMLAnchorElement && isCustomComponent(el)) {
		const { componentName, args } = parseCustomComponent(el);
		return `<${componentName}${
			args
				? ' ' +
				  Object.entries(args)
						.map((arg) => `${arg[0]}="${arg[1]}"`)
						.join(' ')
				: ''
		}/>`;
	}

	if (el instanceof HTMLLIElement) {
		return [...el.childNodes].map((child) => getStringDefinition(child as HTMLElement)).join('');
	}

	if (el instanceof HTMLParagraphElement || el instanceof Text) return el.textContent ?? '';
	if (el instanceof HTMLHeadingElement)
		return `${'#'.repeat(getHeadingDepth(el))} ${el.textContent}`;
	if (el instanceof HTMLImageElement) return `![${el.alt}](${getFormattedUrl(el.src)})`;
	if (el instanceof HTMLAnchorElement) return `[${el.textContent}](${getFormattedUrl(el.href)})`;
	if (el instanceof HTMLUListElement)
		return `${[...el.children]
			.map((child) => `- ${getStringDefinition(child as HTMLElement)}`)
			.join('\n')}`;

	return '';
}
