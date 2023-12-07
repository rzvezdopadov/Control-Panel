export function FormWrapper(payload: { children?: React.ReactNode }) {
	return (
		<div className="flex flex-col bg-gray-900 shadow-[0px_0px_2px_2px] shadow-lime-300 rounded-xl px-2 pt-2 pb-2 m-1 w-80 overflow-scroll">
			{payload.children ? payload.children : <></>}
		</div>
	);
}
