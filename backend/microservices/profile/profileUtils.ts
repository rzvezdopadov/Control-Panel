import { TimeDate } from "../../../utils/timedate";
import { IProfileDBFull, IProfileDBShort, profileDB } from "./profileDB";
import { Random } from "../../../utils/random";
import { ACCTYPE } from "../../../global/roles";

const config = require("config");
const bcrypt = require("bcryptjs");

export interface IProfileUtilsCreate {
	login: string;
	password: string;
	acctype: ACCTYPE;
	place: string;
	bio: string;
}

export const profileUtils = {
	async create(profile: IProfileUtilsCreate) {
		try {
			const hashedPassword = await bcrypt.hash(profile.password, config.get("saltpass"));
			const userid = Random.getRandomString(30);

			const profileNew: IProfileDBFull = {
				login: profile.login,
				password: hashedPassword,
				jwt: [],
				userid: userid,
				acctype: profile.acctype,
				place: profile.place,
				bio: profile.bio,
			};

			const answer = await profileDB.create(profileNew);

			return answer;
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} profileUtils => create: `, error);
			return undefined;
		}
	},
	async getFull(userid: string) {
		try {
			const profile = await profileDB.getFull(userid);

			return profile;
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} profileUtils => getFull: `, error);
			return undefined;
		}
	},
	async getShort(userid: string) {
		try {
			const profile = await profileDB.getShort(userid);

			return profile;
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} profileUtils => getShort: `, error);
			return undefined;
		}
	},
	async getShortAll(acctype: ACCTYPE) {
		try {
			const profile = await profileDB.getShortAll(acctype);

			return profile;
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} profileUtils => getShortAll: `, error);
			return undefined;
		}
	},
	async changeShort(profile: IProfileDBShort) {
		try {
			const answer = await profileDB.changeShort(profile);

			return answer;
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} profileUtils => changeShort: `, error);
			return undefined;
		}
	},
	async delete(userid: string) {
		try {
			const answer = await profileDB.delete(userid);

			return answer;
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} profileUtils => delete: `, error);
			return undefined;
		}
	},
};
