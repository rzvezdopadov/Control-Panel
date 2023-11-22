import { createAction, createReducer } from "@reduxjs/toolkit";
import { getCookiesJWT } from "../../helpers/cookie";

////////////////////////////////////////////////////////////////////////
export const JWT_TOKEN = "JWT_TOKEN";

export const jwtAction = createAction<string>(JWT_TOKEN);

const initialStateJWT: string = getCookiesJWT();

export const jwtReducer = createReducer(initialStateJWT, (builder) => {
	builder.addCase(jwtAction, (state: string, action: any) => {
		return action.payload;
	});
});
