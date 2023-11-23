import { createAction, createReducer } from "@reduxjs/toolkit";
import { IStateModalMessage } from "./iredusers";

////////////////////////////////////////////////////////////////////////
export const MODAL_LOADING = "MODAL_LOADING";

export const modalLoadingAction = createAction<IStateModalMessage>(MODAL_LOADING);

const initialStateModalLoading: IStateModalMessage = {
	enabled: false,
	text: "",
};

export const modalLoadingReducer = createReducer(initialStateModalLoading, (builder) => {
	builder.addCase(modalLoadingAction, (state: IStateModalMessage, action: any) => {
		const { enabled, text } = action.payload;

		return { enabled, text };
	});
});

////////////////////////////////////////////////////////////////////////
export const MODAL_MESSAGE = "MODAL_MESSAGE";

export const modalMessageAction = createAction<IStateModalMessage>(MODAL_MESSAGE);

const initialStateModalMessage: IStateModalMessage = {
	enabled: false,
	text: "",
};

export const modalMessageReducer = createReducer(initialStateModalMessage, (builder) => {
	builder.addCase(modalMessageAction, (state: IStateModalMessage, action: any) => {
		let { enabled, text } = action.payload;

		if (!enabled) text = state.text;

		return { enabled, text };
	});
});
