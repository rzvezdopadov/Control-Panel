import { IQueryAnswerMessageData, IQueryAnswerError } from "../iquerys.api";

export interface ILogin {
	login: string;
	password: string;
}

export interface IQueryAnswerLoginData {
	jwt: string;
	message: string;
}

export interface IQueryAnswerLogin {
	dataLogin: IQueryAnswerLoginData;
	errorLogin: IQueryAnswerError;
	loadedLogin: boolean;
	querySendLogin(data: ILogin): void;
}

export interface IChangePass {
	passwordnow: string;
	passwordnew: string;
}

export interface IQueryAnswerChangePass {
	dataChangePass: IQueryAnswerMessageData;
	errorChangePass: IQueryAnswerError;
	loadedChangePass: boolean;
	querySendChangePass(data: IChangePass): void;
}
