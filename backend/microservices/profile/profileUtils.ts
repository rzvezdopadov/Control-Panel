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

			const answer = profileDB.create(profileNew);

			return answer;
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} profileUtils => create: `, error);
			return undefined;
		}
	},
	async getFull(userId: string) {
		try {
			const profile = await profileDB.getFull(userId);

			return profile;
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} profileUtils => getFull: `, error);
			return undefined;
		}
	},
	async getShort(userId: string) {
		try {
			const profile = await profileDB.getShort(userId);

			return profile;
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} profileUtils => getShort: `, error);
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
};
