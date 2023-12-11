import { alarmDB } from "../../../microservices/alarm/alarmDB";

export async function initDBAlarmData(): Promise<number> {
	try {
		const alarm = await alarmDB.get();

		let isSave = 0;

		if (!alarm) {
			isSave = await alarmDB.add({
				type: 0,
				single: false,
				period: 5,
			});
		}

		return isSave;
	} catch (error) {
		console.log(`alarmDBInitData Error:`, error);
	}
}
