import React from "react";
import { ButtonClose } from "../utils/Buttons/Buttons";
import { useFormVisible } from "../../hooks/form.hook";

export function ModalCloseFormWrapper(payload: {
	children?: React.ReactNode;
	enabled?: boolean;
	formVisible?: ReturnType<typeof useFormVisible>;
}) {
	const closeModalHandler = () => {
		if (!payload.formVisible?.setVisible) return;

		payload.formVisible.setVisible(false);
	};

	return (
		<div
			onClick={closeModalHandler}
			ref={payload.formVisible?.refDivVisible}
			className="flex invisible fixed top-0 left-0 bg-opacity-90 bg-gray-900 z-50 w-full h-full"
		>
			<div className="flex flex-col relative bg-inherit pb-2 rounded-2xl border-2 border-lime-500 m-auto">
				<ButtonClose title="Закрыть" onClick={closeModalHandler}></ButtonClose>
				<div
					className="flex px-12 py-2 flex-col"
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					{payload.children ? payload.children : <></>}
				</div>
			</div>
		</div>
	);
}
