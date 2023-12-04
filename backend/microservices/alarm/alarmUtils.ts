import { TimeDate } from "../../../utils/timedate";
import { IAlarm } from "./ialarm";
import { alarmDB } from "./alarmDB";

export const alarmUtils = {
	async get() {
		try {
			const alarm = await alarmDB.get();

			return alarm;
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} alarmUtils => get: `, error);
			return undefined;
		}
	},
	async change(alarm: IAlarm) {
		try {
			const answer = await alarmDB.change(alarm);

			return answer;
		} catch (error) {
			console.log(`${TimeDate.getTimedateNow()} alarmUtils => change: `, error);
			return undefined;
		}
	},
};
