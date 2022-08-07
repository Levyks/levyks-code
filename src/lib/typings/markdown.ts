export type MarkdownChild = {
	isCompleted: () => boolean;
	write: () => Promise<void>;
	getElement: () => HTMLElement;
};

export type MarkdownContext = {
	addChild: (child: MarkdownChild) => void;
};

export type HeadingDepth = 1 | 2 | 3 | 4 | 5 | 6;
