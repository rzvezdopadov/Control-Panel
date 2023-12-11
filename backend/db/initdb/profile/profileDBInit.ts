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
			bio: "",
		});

		await testHaveUserOrAdd({
			login: "dispatcher",
			password: "dispatcher1234",
			acctype: ACCTYPE.dispatcher,
			place: "dispatcher",
			bio: "",
		});

		for (let i = 1; i < 33; i++) {
			for (let j = 1; j < 6; j++) {
				await testHaveUserOrAdd({
					login: `user${i}${j}`,
					password: `user${i}${j}12345`,
					acctype: ACCTYPE.user,
					place: `${i}.${j}`,
					bio: "",
				});
			}
		}

		return true;
	} catch (error) {
		console.log(`initDB Profile Error:`, error);
		return false;
	}
}
