/* API Query to server */

import { IQueryAnswerError, IQueryAnswerMessageData } from "../iquerys.api";
import { useQuery } from "../../api/querys.api.hook";
import {
	IQueryGetProfile,
	IQueryAnswerGetProfile,
	IQueryGetProfiles,
	IQueryAnswerGetProfiles,
	IQueryCreateProfile,
	IQueryAnswerCreateProfile,
	IQueryDeleteProfile,
	IQueryAnswerDeleteProfile,
} from "./iprofile.api";
import { IProfile } from "../../components/interfaces/iprofiles";

/* Get profile 
    - id = 0 - get our profile, * - other profiles 
*/

export const useQueryProfile = {
	get() {
		const { data, error, loaded, querySend } = useQuery.get();

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
	},
	create() {
		const { data, error, loaded, querySend } = useQuery.post();

		const querySendCreateProfile = async (dataQuery: IQueryCreateProfile) => {
			querySend("/api/profile", dataQuery, true);
		};

		const dataNew = data as IProfile;
		const errorNew = error as IQueryAnswerError;

		const queryAnswer: IQueryAnswerCreateProfile = {
			dataCreateProfile: dataNew,
			errorCreateProfile: errorNew,
			loadedCreateProfile: loaded,
			querySendCreateProfile,
		};

		return queryAnswer;
	},
	delete() {
		const { data, error, loaded, querySend } = useQuery.delete();

		const querySendDeleteProfile = async (dataQuery: IQueryDeleteProfile) => {
			querySend("/api/profile", dataQuery, true);
		};

		const dataNew = data as IQueryAnswerMessageData;
		const errorNew = error as IQueryAnswerError;

		const queryAnswer: IQueryAnswerDeleteProfile = {
			dataDeleteProfile: dataNew,
			errorDeleteProfile: errorNew,
			loadedDeleteProfile: loaded,
			querySendDeleteProfile,
		};

		return queryAnswer;
	},
};

export const useQueryProfiles = {
	get() {
		const { data, error, loaded, querySend } = useQuery.get();

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
	},
};
