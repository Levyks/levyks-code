/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

type Locale = {
	[key: string]: string | Locale;
};

declare module '*.yaml' {
	const locale: Locale;
	export default locale;
}

declare module '*.md' {
	// "unknown" would be more detailed depends on how you structure frontmatter
	const attributes: Record<string, unknown>;

	const html: string;

	// Modify below per your usage
	export { attributes, html };
}
