import { ACCTYPE } from "../../../../global/roles";
import { IProfile } from "../../components/interfaces/iprofiles";
import { IQueryAnswerError } from "../iquerys.api";

export interface IQueryGetProfile {
	userid: string;
}

export interface IQueryAnswerGetProfile {
	dataGetProfile: IProfile;
	errorGetProfile: IQueryAnswerError;
	loadedGetProfile: boolean;
	querySendGetProfile(data: IQueryGetProfile): void;
}

export interface IQueryGetProfiles {
	acctype: ACCTYPE;
}

export interface IQueryAnswerGetProfiles {
	dataGetProfiles: IProfile[];
	errorGetProfiles: IQueryAnswerError;
	loadedGetProfiles: boolean;
	querySendGetProfiles(data: IQueryGetProfiles): void;
}
