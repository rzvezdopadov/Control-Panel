export function ButtonsYesCancelWrapper(payload: {
	children: React.ReactNode;
}) {
	return <div className="flex justify-center w-full">{payload.children}</div>;
}

export function ButtonNaviWrapper(payload: { children: React.ReactNode }) {
	return (
		<div className="flex h-10 w-fit m-2 justify-center items-center bg-gray-900 shadow-[0px_0px_2px_2px] shadow-lime-300 rounded-lg">
			{payload.children}
		</div>
	);
}
