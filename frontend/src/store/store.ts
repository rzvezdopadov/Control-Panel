import { configureStore } from "@reduxjs/toolkit";
import { jwtReducer } from "./reducers/auth";
import { userMyProfileReducer, userProfilesReducer } from "./reducers/profile";
import { modalLoadingReducer, modalMessageReducer } from "./reducers/modal";
import { shopReducer } from "./reducers/shop";
import { alarmReducer } from "./reducers/alarm";

export const store = configureStore({
	reducer: {
		jwt: jwtReducer,
		userMyProfile: userMyProfileReducer,
		modalLoading: modalLoadingReducer,
		modalMessage: modalMessageReducer,
		shop: shopReducer,
		userProfiles: userProfilesReducer,
		alarm: alarmReducer,
	},
});
