import { configureStore } from "@reduxjs/toolkit";
import { jwtReducer } from "./reducers/auth";
import { userMyProfileReducer, userProfilesReducer } from "./reducers/profile";
import { modalLoadingReducer, modalMessageReducer } from "./reducers/modal";
import { shopReducer } from "./reducers/shop";

export const store = configureStore({
	reducer: {
		jwt: jwtReducer,
		userMyProfile: userMyProfileReducer,
		modalLoading: modalLoadingReducer,
		modalMessage: modalMessageReducer,
		shop: shopReducer,
		userProfiles: userProfilesReducer,
	},
});
