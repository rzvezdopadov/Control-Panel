import { poolDB } from "../../db/config";
import { TimeDate } from "../../../utils/timedate";
import { DATABASE } from "../../db/database";
import { IAlarm } from "./ialarm";

export const alarmDB = {
	async add(alarm: IAlarm): Promise<number> {
		try {
			const queryStr = `INSERT INTO ${DATABASE.alarm} (type, single, period) VALUES (${alarm.type}, ${alarm.single}, ${alarm.period})`;
			const answerDB = await poolDB.query(queryStr);

			return answerDB.rowCount;
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} alarmDB => add: `, error);
			return 0;
		}
	},
	async get(): Promise<IAlarm> {
		try {
			const queryStr = `SELECT type, single, period FROM ${DATABASE.alarm}`;
			const answerDB = await poolDB.query(queryStr);

			if (answerDB.rows[0]) return answerDB.rows[0];

			return undefined;
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} alarmDB => get: `, error);
			return undefined;
		}
	},
	async change(alarm: IAlarm): Promise<number> {
		try {
			const queryStr = `UPDATE ${DATABASE.alarm} SET type = ${alarm.type}, single = ${alarm.single}, period = ${alarm.period}`;
			const answerDB = await poolDB.query(queryStr);

			return answerDB.rowCount;
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} alarmDB => change: `, error);
			return 0;
		}
	},
};
