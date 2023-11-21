import { TimeDate } from "../../utils/timedate";
import { Response } from "express";

export const answerStatus = {
	_answerStatus(res: Response, status: number, message: string): Response {
		return res.status(status).json({
			message,
		});
	},
	err200(res: Response, message: string) {
		return answerStatus._answerStatus(res, 200, message);
	},
	err400(res: Response, message: string) {
		return answerStatus._answerStatus(res, 400, message);
	},
	err500(res: Response, message: string) {
		return answerStatus._answerStatus(res, 500, message);
	},
	failJWT(res: Response) {
		return answerStatus.err400(res, "Токен не валидный!");
	},
	accessDenied(res: Response) {
		return answerStatus._answerStatus(
			res,
			403,
			"У вас нет прав доступа на выполнение данной операции!"
		);
	},
	QTDB(res: Response, error?: any) {
		if (error) console.log(`${TimeDate.getTimedateNow()}: "answerStatusQTDB" ${error}`);
		return answerStatus.err500(res, "Ошибка QTDB!");
	},
};
