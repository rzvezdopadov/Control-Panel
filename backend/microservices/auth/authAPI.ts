import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { IChangePass, ILogin } from "./iauth";
import { authDB } from "./authDB";
import { testToken } from "./token";
import { answerStatus } from "../../utils/answerstatus";
import { normalize } from "../../utils/normalize";
import { authUtils } from "./authUtils";

const config = require("config");
const bcrypt = require("bcryptjs");

export const authAPI = {
	async login(req: Request, res: Response) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty())
				return answerStatus.err400(res, "Некорректные данные при входе в систему!");

			let params: ILogin = req.body;
			params.login = normalize.deleteSpace(params.login);
			params.password = normalize.deleteSpace(params.password);

			const ourId = await authDB.getIdByLogin(params.login);

			if (ourId === "") return answerStatus.err400(res, "Такой пользователь не существует!");

			const pass = await authDB.getPasswordById(ourId);
			const isMatch = await bcrypt.compare(params.password, pass);

			if (!isMatch) return answerStatus.err400(res, "Неверный пароль, попробуйте снова!");

			const newToken = await authUtils.generateNewToken(ourId);

			if (newToken) {
				return res.status(200).json({
					jwt: newToken,
					message: "Вы успешно авторизовались!",
				});
			} else {
				return answerStatus.err400(res, "Ошибка QTDB!");
			}
		} catch (error) {
			console.log(error);
			return answerStatus.err500(res, "Что-то пошло не так при аутентификации!");
		}
	},
	async changePass(req: Request, res: Response) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty())
				return answerStatus.err400(res, "Некорректные данные при изменении пароля!");

			let params: IChangePass = req.body;
			params.passwordnow = normalize.deleteSpace(params.passwordnow);
			params.passwordnew = normalize.deleteSpace(params.passwordnew);

			let { jwt }: { jwt: string } = req.cookies;
			jwt = normalize.deleteSpace(jwt);

			const jwtDecode = await testToken(jwt);

			if (!jwtDecode) return answerStatus.failJWT(res);

			const pass = await authDB.getPasswordById(jwtDecode.userId);

			const isMatch = await bcrypt.compare(params.passwordnow, pass);

			if (!isMatch) return answerStatus.err400(res, "Неверный пароль, попробуйте снова!");

			const hashedPassword = await bcrypt.hash(params.passwordnew, config.get("saltpass"));

			const isSaveNewPassword = await authDB.setPasswordById(
				jwtDecode.userId,
				hashedPassword
			);

			if (!isSaveNewPassword) return answerStatus.err400(res, "Ошибка при изменении пароля!");

			return answerStatus.err200(res, "Пароль успешно изменен!");
		} catch (error) {
			console.log(error);
			answerStatus.err500(res, "Что-то пошло не так при изменении пароля!");
		}
	},
};
