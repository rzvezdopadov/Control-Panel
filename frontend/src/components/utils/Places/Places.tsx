export function Place(payload: {
	value?: string;
	invisible?: boolean;
	colorEn?: boolean;
	children?: React.ReactNode;
}) {
	return (
		<div
			className={`flex justify-center items-center border-2 rounded-md h-10 w-16 my-2 mx-auto ${
				payload.colorEn ? "bg-red-500 border-black" : "bg-lime-500"
			}${payload.invisible ? " opacity-0" : " opacity-100"}`}
		>
			<label
				className={`flex justify-center my-2 select-none rounded-md text-lg font-bold ${
					payload.colorEn ? "bg-red-500 text-black" : "bg-lime-500 text-white"
				}`}
			>
				{payload.value ? payload.value : payload.children ? payload.children : <></>}
			</label>
		</div>
	);
}

export function Delimiter(payload: { color?: string; children?: React.ReactNode }) {
	return (
		<div className="flex w-full bg-black min-h-4 h-4">
			{payload.children ? payload.children : <></>}
		</div>
	);
}

export function PlacesRowWrapper(payload: { color?: string; children?: React.ReactNode }) {
	return (
		<div className="flex w-full h-fit justify-center m-auto">
			{payload.children ? payload.children : <></>}
		</div>
	);
}
