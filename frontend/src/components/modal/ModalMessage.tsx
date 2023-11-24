import { useRefModalMessage } from "../../hooks/form.hook";
import { modalMessageAction } from "../../store/reducers/modal";
import { store } from "../../store/store";

export function modalMessageOpen(text: string) {
	store.dispatch(modalMessageAction({ enabled: true, text }));
}

function modalMessageClose() {
	store.dispatch(modalMessageAction({ enabled: false, text: "" }));
}

export function ModalMessage() {
	const { modalMessage } = store.getState();
	const refModalMessage = useRefModalMessage(modalMessage.enabled);

	return (
		<div
			ref={refModalMessage}
			id="modal-message"
			onClick={modalMessageClose}
			className="fixed border-2 border-lime-300 left-0 right-0 m-auto bottom-[-250px] rounded-t-xl h-auto w-80 z-40 bg-gray-700 p-2 flex flex-col space-y-5 text-white duration-1000 delay-300"
		>
			{modalMessage.text}
		</div>
	);
}
