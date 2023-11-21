import { authDB } from "../../../microservices/auth/authDB";
import { IProfileUtilsCreate, profileUtils } from "../../../microservices/profile/profileUtils";
import { ACCTYPE } from "../../../../global/roles";
const config = require("config");

async function testHaveUserOrAdd(user: IProfileUtilsCreate) {
	try {
		const profile = await authDB.getIdByLogin(user.login);

		if (!profile) {
			await profileUtils.create(user);
		}
	} catch (error) {
		console.log(`testAndAddNewUser Error:`, error);
	}
}

export async function initDBProfile(): Promise<boolean> {
	try {
		await testHaveUserOrAdd({
			login: "admin",
			password: config.get("defaultPassAdmin"),
			acctype: ACCTYPE.admin,
			place: "admin",
			bio: "Администратор",
		});

		await testHaveUserOrAdd({
			login: "dispatcher",
			password: "123456789",
			acctype: ACCTYPE.dispatcher,
			place: "dispatcher",
			bio: "Диспетчер",
		});

		await testHaveUserOrAdd({
			login: "user11",
			password: "123456789",
			acctype: ACCTYPE.user,
			place: "1.1",
			bio: "Пользователь место 1.1",
		});

		return true;
	} catch (error) {
		console.log(`initDB Profile Error:`, error);
		return false;
	}
}
