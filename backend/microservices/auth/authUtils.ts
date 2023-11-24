import { answerStatus } from "../../utils/answerstatus";
import { ACCTYPE } from "../../../global/roles";
import { ILogin } from "./iauth";
import { TIMECODE, TimeDate } from "../../../utils/timedate";
import { authDB } from "./authDB";
import { Response } from "express";

const config = require("config");
const bcrypt = require("bcryptjs");
const jwtToken = require("jsonwebtoken");

export const authUtils = {
	async isCandidateType(res: Response, userId: string, acctypes: ACCTYPE[]): Promise<boolean> {
		try {
			const candidate = await authDB.getAcctypeById(userId);

			if (!acctypes.includes(candidate)) {
				answerStatus.accessDenied(res);

				return false;
			}

			return true;
		} catch (error) {
			console.log("isCandidateType:", error);

			return false;
		}
	},
	// async createProfile(userId: string, registration: IRegistration) {
	// 	try {
	// 		const timecode = TimeDate.getTimecodeNow();
	// 		const verifiacccode = Random.getRandomString(30);
	// 		const hashedPassword = await bcrypt.hash(registration.password, config.get("saltpass"));

	// 		const auth: IAuthDB = {
	// 			userid: userId,
	// 			email: registration.email,
	// 			password: hashedPassword,
	// 			jwt: [],
	// 			coordinates: {
	// 				latitude: 0,
	// 				longitude: 0,
	// 			},
	// 			registrationdate: timecode,
	// 			phone: "",
	// 			cash: 1000,
	// 			acctype: ACCTYPE.user,
	// 			banned: {
	// 				timecode: 0,
	// 				whobanned: "",
	// 				discription: "",
	// 			},
	// 			referral: registration.referral ? registration.referral : "",
	// 			deleteacc: 0,
	// 			temppasscode: "",
	// 			verifiacc: TimeDate.getTimecodeNow() + TIMECODE.DAY,
	// 			verifiacccode: verifiacccode,
	// 		};

	// 		const isReg = await authDB.createProfile(auth);

	// 		return isReg;
	// 	} catch (error) {
	// 		return false;
	// 	}
	// },
	async generateNewToken(userId: string) {
		try {
			const token = await jwtToken.sign({ userId }, config.get("jwtSecret"), {
				expiresIn: "7d",
			});

			const jwts = await authDB.getJWT(userId);

			if (!jwts) return "";

			const timeNow = TimeDate.getTimecodeNow();

			const newJWTs = jwts.filter((jwt) => {
				if (jwt.timecode + TIMECODE.WEEK > timeNow) return true;
			});

			newJWTs.push({
				timecode: timeNow,
				token: token,
				ipaddress: "",
				browser: "",
			});

			const answerSetJWT = await authDB.setJWT(userId, newJWTs);

			return answerSetJWT ? token : "";
		} catch (error) {
			return "";
		}
	},
};
