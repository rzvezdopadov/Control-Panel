import { createAction, createReducer } from "@reduxjs/toolkit";

////////////////////////////////////////////////////////////////////////
export interface IStateAlarm {
	type: number;
	single: boolean;
	period: number;
}

export const ALARM = "ALARM";

export const alarmAction = createAction<IStateAlarm>(ALARM);

const initialStateAlarm: IStateAlarm = {
	type: 0,
	single: false,
	period: 0,
};

export const alarmReducer = createReducer(initialStateAlarm, (builder) => {
	builder.addCase(alarmAction, (state: IStateAlarm, action: { payload: IStateAlarm }) => {
		const alarm = { ...action.payload };

		return alarm;
	});
});
