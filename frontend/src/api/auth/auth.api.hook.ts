import { IQueryAnswerMessageData, IQueryAnswerError } from "../iquerys.api";
import { useQueryPost, useQueryPut } from "../querys.api.hook";
import {
	IQueryAnswerLoginData,
	IQueryAnswerLogin,
	IQueryAnswerChangePass,
	ILogin,
	IChangePass,
} from "./iauth.api";

/* API Query to server */

/* Enter user */
export function useQueryLogin() {
	const { data, error, loaded, querySend } = useQueryPost();

	const querySendLogin = async (dataQuery: ILogin) => {
		querySend("/api/login", dataQuery, true);
	};

	const dataNew = data as IQueryAnswerLoginData;
	const errorNew = error as IQueryAnswerError;

	const queryAnswer: IQueryAnswerLogin = {
		dataLogin: dataNew,
		errorLogin: errorNew,
		loadedLogin: loaded,
		querySendLogin,
	};

	return queryAnswer;
}

/* Change password */
export function useQueryChangePass() {
	const { data, error, loaded, querySend } = useQueryPut();

	const querySendChangePass = async (dataQuery: IChangePass) => {
		querySend("/api/changepass", dataQuery, true);
	};

	const dataNew = data as IQueryAnswerMessageData;
	const errorNew = error as IQueryAnswerError;

	const queryAnswer: IQueryAnswerChangePass = {
		dataChangePass: dataNew,
		errorChangePass: errorNew,
		loadedChangePass: loaded,
		querySendChangePass,
	};

	return queryAnswer;
}
