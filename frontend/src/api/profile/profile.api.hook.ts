/* API Query to server */

import { IQueryAnswerError } from "../iquerys.api";
import { useQueryGet } from "../../api/querys.api.hook";
import { IQueryGetProfile, IQueryAnswerGetProfile } from "./iprofile.api";
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
