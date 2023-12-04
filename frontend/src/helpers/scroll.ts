export const scrollToTop = (bottomRef: React.RefObject<HTMLElement>) => {
	if (!bottomRef.current) return;

	bottomRef.current.scrollTo(0, 0);
};

export const invisibleOnScrollToTop = (
	e: React.UIEvent<HTMLDivElement>,
	topBtnRef: React.RefObject<HTMLDivElement>
) => {
	const scrollPos = e.currentTarget.scrollTop;

	if (!(e && topBtnRef.current)) return;

	if (scrollPos > 100) {
		topBtnRef.current.classList.remove("invisible");
	} else {
		topBtnRef.current.classList.add("invisible");
	}
};
