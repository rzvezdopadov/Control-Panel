/* API Query to server */

import { IQueryAnswerError } from "../iquerys.api";
import { useQueryGet } from "../../api/querys.api.hook";
import {
	IQueryGetProfile,
	IQueryAnswerGetProfile,
	IQueryGetProfiles,
	IQueryAnswerGetProfiles,
} from "./iprofile.api";
import { IProfile } from "../../components/interfaces/iprofiles";

/* Get profile 
    - id = 0 - get our profile, * - other profiles 
*/

export function useQueryGetProfile() {
	const { data, error, loaded, querySend } = useQueryGet();

	const querySendGetProfile = async (dataQuery: IQueryGetProfile) => {
		querySend("/api/profile", dataQuery, true);
	};

	const dataNew = data as IProfile;
	const errorNew = error as IQueryAnswerError;

	const queryAnswer: IQueryAnswerGetProfile = {
		dataGetProfile: dataNew,
		errorGetProfile: errorNew,
		loadedGetProfile: loaded,
		querySendGetProfile,
	};

	return queryAnswer;
}

export function useQueryGetProfiles() {
	const { data, error, loaded, querySend } = useQueryGet();

	const querySendGetProfiles = async (dataQuery: IQueryGetProfiles) => {
		querySend("/api/profiles", dataQuery, true);
	};

	const dataNew = data as IProfile[];
	const errorNew = error as IQueryAnswerError;

	const queryAnswer: IQueryAnswerGetProfiles = {
		dataGetProfiles: dataNew,
		errorGetProfiles: errorNew,
		loadedGetProfiles: loaded,
		querySendGetProfiles,
	};

	return queryAnswer;
}
