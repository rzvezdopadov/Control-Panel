import { IStateAlarm } from "../../store/reducers/alarm";
import { IQueryAnswerError, IQueryAnswerMessageData } from "../iquerys.api";
import { useQuery } from "../querys.api.hook";
import { IQueryAnswerChangeAlarm, IQueryAnswerGetAlarm } from "./ialarm.api";

export const useQueryAlarm = {
	get() {
		const { data, error, loaded, querySend } = useQuery.get();

		const querySendGetAlarm = async () => {
			querySend("/api/alarm", {}, true);
		};

		const dataNew = data as IStateAlarm;
		const errorNew = error as IQueryAnswerError;

		const queryAnswer: IQueryAnswerGetAlarm = {
			dataGetAlarm: dataNew,
			errorGetAlarm: errorNew,
			loadedGetAlarm: loaded,
			querySendGetAlarm,
		};

		return queryAnswer;
	},
	change() {
		const { data, error, loaded, querySend } = useQuery.put();

		const querySendChangeAlarm = async (dataQuery: IStateAlarm) => {
			querySend("/api/alarm", dataQuery, true);
		};

		const dataNew = data as IQueryAnswerMessageData;
		const errorNew = error as IQueryAnswerError;

		const queryAnswer: IQueryAnswerChangeAlarm = {
			dataChangeAlarm: dataNew,
			errorChangeAlarm: errorNew,
			loadedChangeAlarm: loaded,
			querySendChangeAlarm,
		};

		return queryAnswer;
	},
};
