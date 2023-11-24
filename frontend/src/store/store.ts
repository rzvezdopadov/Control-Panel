import { configureStore } from "@reduxjs/toolkit";
import { jwtReducer } from "./reducers/auth";
import { userMyProfileReducer } from "./reducers/profile";
import { modalLoadingReducer, modalMessageReducer } from "./reducers/modal";

export const store = configureStore({
	reducer: {
		jwt: jwtReducer,
		userMyProfile: userMyProfileReducer,
		modalLoading: modalLoadingReducer,
		modalMessage: modalMessageReducer,
	},
});
