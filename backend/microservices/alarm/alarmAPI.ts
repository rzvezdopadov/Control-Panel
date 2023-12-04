import { answerStatus } from "../../utils/answerstatus";
import { normalize } from "../../../utils/normalize";
import { Request, Response } from "express";
import { testToken } from "../auth/token";
import { alarmUtils } from "./alarmUtils";
import { IAlarm } from "./ialarm";

export const alarmAPI = {
	async get(req: Request, res: Response) {
		try {
			let { jwt }: { jwt: string } = req.cookies;
			jwt = normalize.deleteSpace(jwt);

			const jwtDecode = await testToken(jwt);

			if (!jwtDecode) return answerStatus.failJWT(res);

			const alarm = await alarmUtils.get();

			if (!alarm) return answerStatus.err400(res, "Ошибка QTDB!");

			return res.status(200).json(alarm);
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

			let alarm = req.body as unknown as IAlarm;

			alarm.type = Number(alarm.type);
			alarm.period = Number(alarm.period);

			const isAlarm = await alarmUtils.change(alarm);

			if (isAlarm)
				return res.status(201).json({
					msg: "Успешно сохранено!",
				});

			return answerStatus.err400(res, "Возникла ошибка при сохранении!");
		} catch (error) {
			console.log(error);
			return answerStatus.err500(res, "Что-то пошло не так при аутентификации!");
		}
	},
};
