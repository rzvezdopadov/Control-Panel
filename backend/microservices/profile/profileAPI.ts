import { answerStatus } from "../../utils/answerstatus";
import { normalize } from "../../../utils/normalize";
import { Request, Response } from "express";
import { testToken } from "../auth/token";
import { ACCTYPE } from "../../../global/roles";
import { profileUtils } from "./profileUtils";
import { authDB } from "../auth/authDB";

interface IProfileCreateAPI {
	login: string;
	password: string;
	place: string;
	acctype: ACCTYPE;
	bio: string;
}

interface IProfileChangeAPI {
	userid: string;
	login: string;
	password: string;
	place: string;
	acctype: ACCTYPE;
	bio: string;
}

export const profileAPI = {
	async create(req: Request, res: Response) {
		try {
			let { jwt }: { jwt: string } = req.cookies;
			jwt = normalize.deleteSpace(jwt);

			const jwtDecode = await testToken(jwt);

			if (!jwtDecode) return answerStatus.failJWT(res);

			let profile = req.body as unknown as IProfileCreateAPI;
			profile.login = normalize.deleteSpace(profile.login);
			profile.password = normalize.deleteSpace(profile.password);

			const isLoginHave = await authDB.getIdByLogin(profile.login);

			if (isLoginHave) return answerStatus.err400(res, "Такой логин уже зарегистрирован!");

			if (!profile.login || !profile.password || !profile.acctype || !profile.bio)
				return answerStatus.err400(res, "Один из параметров задан неверно!");

			const isAuthCreate = await profileUtils.create(profile);

			if (isAuthCreate)
				return res.status(201).json({
					msg: "Пользователь успешно создан!",
				});

			return answerStatus.err400(res, "Возникла ошибка при регистрации!");
		} catch (error) {
			console.log(error);
			return answerStatus.err500(res, "Что-то пошло не так при аутентификации!");
		}
	},
	async get(req: Request, res: Response) {
		try {
			let { jwt }: { jwt: string } = req.cookies;
			jwt = normalize.deleteSpace(jwt);

			const jwtDecode = await testToken(jwt);

			if (!jwtDecode) return answerStatus.failJWT(res);

			let { userid } = req.query as { userid: string };
			let userIdNew = normalize.deleteSpace(userid);

			if (userIdNew === "0") {
				userIdNew = jwtDecode.userId;
			}

			const profile = await profileUtils.getShort(userIdNew);

			if (!profile) return answerStatus.err400(res, "Ошибка QTDB!");

			return res.status(200).json(profile);
		} catch (error) {
			console.log(error);
			return answerStatus.err500(res, "Что-то пошло не так при аутентификации!");
		}
	},
	async getAll(req: Request, res: Response) {
		try {
			let { jwt }: { jwt: string } = req.cookies;
			jwt = normalize.deleteSpace(jwt);

			const jwtDecode = await testToken(jwt);

			if (!jwtDecode) return answerStatus.failJWT(res);

			let { acctype } = req.query as { acctype: ACCTYPE };

			const profile = await profileUtils.getShortAll(acctype);

			if (!profile) return answerStatus.err400(res, "Ошибка QTDB!");

			return res.status(200).json(profile);
		} catch (error) {
			console.log(error);
			return answerStatus.err500(res, "Что-то пошло не так при аутентификации!");
		}
	},
	async change(req: Request, res: Response) {
		try {
			let { jwt }: { jwt: string } = req.cookies;
			jwt = normalize.deleteSpace(jwt);

			const jwtDecode = await testToken(jwt);

			if (!jwtDecode) return answerStatus.failJWT(res);

			let profile = req.query as unknown as IProfileChangeAPI;
			profile.login = normalize.deleteSpace(profile.login);
			profile.password = normalize.deleteSpace(profile.password);

			if (
				!profile.login ||
				!profile.userid ||
				!profile.password ||
				!profile.acctype ||
				!profile.bio
			)
				return answerStatus.err400(res, "Один из параметров задан неверно!");

			const isAuthCreate = await profileUtils.changeShort(profile);

			if (isAuthCreate)
				return res.status(201).json({
					msg: "Пользователь успешно изменен!",
				});

			return answerStatus.err400(res, "Возникла ошибка при регистрации!");
		} catch (error) {
			console.log(error);
			return answerStatus.err500(res, "Что-то пошло не так при аутентификации!");
		}
	},
	async delete(req: Request, res: Response) {
		try {
			let { jwt }: { jwt: string } = req.cookies;
			jwt = normalize.deleteSpace(jwt);

			const jwtDecode = await testToken(jwt);

			if (!jwtDecode) return answerStatus.failJWT(res);

			let { userid } = req.body as unknown as { userid: string };
			userid = normalize.deleteSpace(userid);

			const isDelete = await profileUtils.delete(userid);

			if (isDelete)
				return res.status(204).json({
					msg: "Пользователь успешно удален!",
				});

			return answerStatus.err400(res, "Возникла ошибка при удалении!");
		} catch (error) {
			console.log(error);
			return answerStatus.err500(res, "Что-то пошло не так при аутентификации!");
		}
	},
};
