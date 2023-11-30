import { createAction, createReducer } from "@reduxjs/toolkit";
import { IProfile } from "../../components/interfaces/iprofiles";
import { ACCTYPE } from "../../../../global/roles";

////////////////////////////////////////////////////////////////////////
export const USER_MYPROFILE = "USER_MYPROFILE";

export const userMyProfileAction = createAction<IProfile>(USER_MYPROFILE);

export const initialStateUserMyProfile: IProfile = {
	userid: "",
	acctype: ACCTYPE.user,
	place: "",
	bio: "",
};

export const userMyProfileReducer = createReducer(initialStateUserMyProfile, (builder) => {
	builder.addCase(userMyProfileAction, (state: IProfile, action: { payload: IProfile }) => {
		const profile = { ...action.payload };

		return profile;
	});
});
////////////////////////////////////////////////////////////////////////
export const USER_PROFILES = "USER_PROFILES";

export const userProfilesAction = createAction<IProfile[]>(USER_PROFILES);

export const initialStateUserProfiles: IProfile[] = [];

export const userProfilesReducer = createReducer(initialStateUserProfiles, (builder) => {
	builder.addCase(userProfilesAction, (state: IProfile[], action: { payload: IProfile[] }) => {
		const profiles = [...action.payload];

		return profiles;
	});
});
