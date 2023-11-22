import * as React from "react";

export function MainWrapper(payload: { children?: React.ReactNode }) {
	return (
		<main className="flex flex-grow fixed top-20 bottom-4 rounded-xl overflow-hidden justify-center items-center">
			{payload.children ? payload.children : <></>}
		</main>
	);
}
