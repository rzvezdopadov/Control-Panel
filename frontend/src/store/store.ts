import { configureStore } from "@reduxjs/toolkit";
import { jwtReducer } from "./reducers/auth";
import { userMyProfileReducer } from "./reducers/profile";
import { modalLoadingReducer } from "./reducers/modal";

export const store = configureStore({
	reducer: {
		jwt: jwtReducer,
		userMyProfile: userMyProfileReducer,
		modalLoading: modalLoadingReducer,
	},
});
