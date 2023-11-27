export function Label(payload: {
	value?: string;
	fontsize?: string;
	bold?: boolean;
	title?: string;
	bgcolor?: string;
	shadow?: boolean;
	selectauto?: boolean;
	children?: React.ReactNode;
}) {
	return (
		<label
			className={`flex justify-center my-2 rounded-md text-white${
				payload.bold ? " font-bold" : ""
			}${payload.fontsize ? ` ${payload.fontsize}` : ""}${
				payload.bgcolor ? ` ${payload.bgcolor}` : ""
			}${payload.shadow ? " shadow-[0px_0px_2px_2px] shadow-lime-300" : ""}${
				payload.selectauto ? ` select-auto` : ` select-none`
			}`}
			title={payload.title ? payload.title : ""}
		>
			{payload.value ? payload.value : payload.children ? payload.children : <></>}
		</label>
	);
}

export function LabelPageName(payload: { value: string }) {
	return <Label value={payload.value} fontsize={"text-lg"} bold={true}></Label>;
}

export function LabelWidget(payload: { value: string }) {
	return <Label value={payload.value} fontsize={"text-base"} bold={true}></Label>;
}
