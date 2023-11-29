import { useRefDivVisible } from "../../hooks/form.hook";

export function ModalWrapper(payload: {
	enabled: boolean;
	children?: React.ReactNode;
	closeClbk?: React.MouseEventHandler<HTMLElement>;
}) {
	const refModal = useRefDivVisible(payload.enabled);

	const closeModal = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();

		if (e.target !== e.currentTarget) return;
		if (payload.closeClbk) payload.closeClbk(e);
	};

	return (
		<div
			onClick={closeModal}
			ref={refModal}
			className="flex invisible fixed top-0 left-0 bg-opacity-90 bg-gray-900 z-50 w-full h-full"
		>
			{payload.children ? payload.children : <></>}
		</div>
	);
}
