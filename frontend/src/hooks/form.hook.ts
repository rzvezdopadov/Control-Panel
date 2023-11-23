import * as React from "react";
import { store } from "../store/store";
import { modalMessageAction } from "../store/reducers/modal";

export const useFormFieldInputString = (initialValue: string = "") => {
	const [value, setValue] = React.useState(initialValue);
	const onChange = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
		[]
	);
	return { value, onChange };
};

export const useRefDivVisible = (value: boolean) => {
	const refDivVisible = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (!refDivVisible.current) return;

		if (value) {
			refDivVisible.current.classList.remove("invisible");
		} else {
			refDivVisible.current.classList.add("invisible");
		}
	}, [value]);

	return refDivVisible;
};

export const useRefModalMessage = (value: boolean) => {
	const refModalMessage = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (!refModalMessage.current) return;

		if (value) {
			refModalMessage.current.classList.remove("bottom-[-250px]");
			refModalMessage.current.classList.add("bottom-0");

			setTimeout(() => {
				store.dispatch(modalMessageAction({ enabled: false, text: "" }));
			}, 5000);
		} else {
			refModalMessage.current.classList.remove("bottom-0");
			refModalMessage.current.classList.add("bottom-[-250px]");
		}
	}, [value]);

	return refModalMessage;
};
