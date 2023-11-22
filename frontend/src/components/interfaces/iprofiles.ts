import { ACCTYPE } from "../../../../global/roles";

export interface IProfile {
	userid: string;
	acctype: ACCTYPE;
	place: string;
	bio: string;
}
