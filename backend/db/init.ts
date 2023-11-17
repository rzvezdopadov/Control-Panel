import { initDBAlarm } from "./initdb/alarm/alarmDBInit";
import { initDBAuth } from "./initdb/auth/authDBInit";

export async function initDB(): Promise<boolean> {
	try {
		await initDBAuth();
		await initDBAlarm();

		return true;
	} catch (error) {
		console.log("initDB Error:", error);
		return false;
	}
}
