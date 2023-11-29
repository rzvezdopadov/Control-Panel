export function SelectFromArrValue(payload: {
	title?: string;
	value?: string | number;
	data?: string[] | number[];
	onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}) {
	return (
		<div className="flex justify-around flex-wrap bg-inherit border-2 border-lime-300 rounded-md p-0.5 px-1 m-1.5 relative items-center w-full min-[480px]:w-auto">
			<div className="flex mr-0.5">
				<span className="select-none text-white"> {payload.title} </span>
			</div>
			<div className="flex ml-0.5 bg-inherit">
				<select
					value={payload.value ? payload.value : ""}
					onChange={payload.onChange ? payload.onChange : () => {}}
					className="flex bg-inherit text-center w-full text-white border border-lime-300 cursor-pointer m-1 rounded-md"
					title={payload.title}
				>
					{payload?.data?.map((value, index) => {
						return (
							<option
								className="bg-gray-900"
								key={`${payload.data}${index}`}
								value={value}
							>
								{` ${value}`}
							</option>
						);
					})}
				</select>
			</div>
		</div>
	);
}
