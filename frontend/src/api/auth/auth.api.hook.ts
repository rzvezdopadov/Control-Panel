import { IQueryAnswerMessageData, IQueryAnswerError } from "../iquerys.api";
import { useQuery } from "../querys.api.hook";
import {
	IQueryAnswerLoginData,
	IQueryAnswerLogin,
	IQueryAnswerChangePass,
	ILogin,
	IChangePass,
} from "./iauth.api";

/* API Query to server */

export const useQueryAuth = {
	/* Enter user */
	login() {
		const { data, error, loaded, querySend } = useQuery.post();

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
	},

	/* Change password */
	changePass() {
		const { data, error, loaded, querySend } = useQuery.put();

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
	},
};
