import { configureStore } from "@reduxjs/toolkit";
import { jwtReducer } from "./reducers/auth";

export const store = configureStore({
	reducer: {
		jwt: jwtReducer,
	},
});
