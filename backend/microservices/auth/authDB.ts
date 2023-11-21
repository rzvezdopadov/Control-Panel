import { poolDB } from "../../db/config";
import { IJWT } from "./iauth";
import { TimeDate } from "../../../utils/timedate";
import { DATABASE } from "../../db/database";
import { ACCTYPE } from "../../../global/roles";

export const authDB = {
	async getAcctypeById(userId: string): Promise<ACCTYPE> {
		try {
			const queryStr = `SELECT acctype FROM ${DATABASE.auth} WHERE userid = '${userId}'`;
			const answerDB = await poolDB.query(queryStr);

			if (answerDB.rows[0]?.acctype) return answerDB.rows[0].acctype;

			return ACCTYPE.user;
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} authDB => getAcctypeById: `, error);
			return ACCTYPE.user;
		}
	},
	async getIdByLogin(login: string): Promise<string> {
		try {
			const queryStr = `SELECT userid FROM ${DATABASE.auth} WHERE login = '${login}'`;
			const answerDB = await poolDB.query(queryStr);

			if (answerDB.rows[0]?.userid) return answerDB.rows[0].userid;

			return "";
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} authDB => getIdByLogin: `, error);
			return "";
		}
	},
	async getPasswordById(userid: string): Promise<string> {
		try {
			const queryStr = `SELECT password FROM ${DATABASE.auth} WHERE userid = '${userid}'`;
			const answerDB = await poolDB.query(queryStr);

			if (answerDB.rows[0]?.password) return answerDB.rows[0].password;

			return "";
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} authDB => getPasswordById: `, error);
			return "";
		}
	},
	async setPasswordById(ourId: string, hashedPassword: string): Promise<string> {
		try {
			const queryStr = `UPDATE ${DATABASE.auth} SET password = '${hashedPassword}' WHERE userid = '${ourId}'`;
			const answerDB = await poolDB.query(queryStr);

			return answerDB.rowCount;
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} authDB => setPasswordById: `, error);
			return "";
		}
	},
	async getJWT(ourId: string): Promise<IJWT[]> {
		try {
			const queryStr = `SELECT jwt FROM ${DATABASE.auth} WHERE userid = '${ourId}'`;
			const answerDB = await poolDB.query(queryStr);

			if (answerDB.rows[0]?.jwt) return answerDB.rows[0].jwt;

			return undefined;
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} authDB => getJWT: `, error);
			return undefined;
		}
	},
	async setJWT(ourId: string, jwts: IJWT[]): Promise<number> {
		try {
			const queryStr = `UPDATE ${DATABASE.auth} SET jwt = $1 :: JSON[] WHERE userid = '${ourId}'`;
			const answerDB = await poolDB.query(queryStr, [jwts]);

			return answerDB.rowCount;
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} authDB => setJWT: `, error);
			return 0;
		}
	},
};
