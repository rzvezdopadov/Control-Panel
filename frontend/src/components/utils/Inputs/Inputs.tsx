import { ChangeEventHandler } from "react";

export function Input(payload: {
	value?: string | number;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	type?: string;
	title?: string;
	placeholder?: string;
}) {
	return (
		<div key={payload.placeholder} className="flex relative flex-col my-1 p-1">
			<input
				value={payload.value ? payload.value : ""}
				onChange={payload.onChange ? payload.onChange : () => {}}
				title={
					payload.title ? payload.title : payload.placeholder ? payload.placeholder : ""
				}
				className="flex text-center rounded-md border-2 border-lime-300 bg-inherit text-white m-0.5 py-1 px-3"
				type={payload.type ? payload.type : "button"}
				placeholder={payload.placeholder ? payload.placeholder : ""}
			/>
			<label
				className={`flex justify-center items-center absolute transition-opacity ease-linear delay-500 text-center text-[10px] h-0 bg-gray-900 text-white -translate-y-2 translate-x-2 py-2 px-3${
					!payload.value ? " opacity-0" : " opacity-100"
				}`}
			>
				{payload.placeholder}
			</label>
		</div>
	);
}
