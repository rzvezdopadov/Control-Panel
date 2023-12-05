import { IStateAlarm } from "../../store/reducers/alarm";
import { IQueryAnswerMessageData, IQueryAnswerError } from "../iquerys.api";

export interface IQueryAnswerGetAlarm {
	dataGetAlarm: IStateAlarm;
	errorGetAlarm: IQueryAnswerError;
	loadedGetAlarm: boolean;
	querySendGetAlarm(): void;
}

export interface IQueryAnswerChangeAlarm {
	dataChangeAlarm: IQueryAnswerMessageData;
	errorChangeAlarm: IQueryAnswerError;
	loadedChangeAlarm: boolean;
	querySendChangeAlarm(data: IStateAlarm): void;
}
