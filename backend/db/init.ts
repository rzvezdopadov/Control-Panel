import { initDBAlarm } from "./initdb/alarm/alarmDBInit";
import { initDBAuth } from "./initdb/auth/authDBInit";
import { initDBProfile } from "./initdb/profile/profileDBInit";

export async function initDB(): Promise<boolean> {
	try {
		await initDBAuth();
		await initDBAlarm();
		await initDBProfile();

		return true;
	} catch (error) {
		console.log("initDB Error:", error);
		return false;
	}
}
