import { ACCTYPE } from "../../../global/roles";
import { TimeDate } from "../../../utils/timedate";
import { poolDB } from "../../db/config";
import { DATABASE } from "../../db/database";
import { IJWT } from "../auth/iauth";

export interface IProfileDBShort {
	userid: string;
	acctype: ACCTYPE;
	place: string;
	bio: string;
}

export interface IProfileDBFull extends IProfileDBShort {
	login: string;
	password: string;
	jwt: IJWT[];
}

const paramsProfileFull = `userid, login, password, jwt, acctype, place, bio`;

export const profileDB = {
	async create(profile: IProfileDBFull): Promise<number> {
		try {
			const queryStr =
				`INSERT INTO ${DATABASE.auth} (` +
				paramsProfileFull +
				") VALUES (" +
				`'${profile.userid}', '${profile.login}', '${profile.password}', $1, ` +
				`'${profile.acctype}', '${profile.place}', '${profile.bio}'` +
				")";

			const answerDB = (await poolDB.query(queryStr, [profile.jwt])) as { rowCount: number };

			if (answerDB.rowCount) return answerDB.rowCount;

			return 0;
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} profileDB => create: `, error);
			return 0;
		}
	},
	async getFull(userid: string): Promise<IProfileDBFull> {
		try {
			const queryStr = `SELECT ${paramsProfileFull} FROM ${DATABASE.auth} WHERE userid = '${userid}'`;
			const answerDB = await poolDB.query(queryStr);

			if (answerDB.rows[0]) return answerDB.rows[0];

			return undefined;
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} profileDB => getFull: `, error);
			return undefined;
		}
	},
	async changeShort(profile: IProfileDBShort): Promise<IProfileDBShort> {
		try {
			let queryStr =
				`UPDATE ${DATABASE.auth} SET ` +
				`acctype = ${profile.acctype}, ` +
				`place = '${profile.place}', ` +
				`bio = '${profile.bio}' ` +
				`WHERE userid = '${profile.userid}'`;

			const answerDBProfile = await poolDB.query(queryStr);

			if (!answerDBProfile) return undefined;

			const answerDBGetProfile = await profileDB.getFull(profile.userid);

			if (answerDBGetProfile) return answerDBGetProfile;

			return undefined;
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} profileDB => setFull: `, error);
			return undefined;
		}
	},
};
