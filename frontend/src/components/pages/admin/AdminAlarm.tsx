import { useEffect } from "react";
import { useQueryAlarm } from "../../../api/alarm/alarm.api.hook";
import { useFormFieldInputString, useFormFieldSelectString } from "../../../hooks/form.hook";
import { store } from "../../../store/store";
import { Button } from "../../utils/Buttons/Buttons";
import { Input } from "../../utils/Inputs/Inputs";
import { LabelWidget } from "../../utils/Labels/Labels";
import { SelectFromArrValue } from "../../utils/Selects/Selects";
import { FormWrapper } from "../../wrappers/FormWrapper";
import { MainScrollWrapper } from "../../wrappers/MainScrollWrapper";
import { alarmAction } from "../../../store/reducers/alarm";
import { modalMessageOpen } from "../../modal/ModalMessage";
import { compare } from "../../../../../utils/compare";

export function AdminAlarm() {
	const { userMyProfile, alarm } = store.getState();
	const { dataGetAlarm, errorGetAlarm, querySendGetAlarm } = useQueryAlarm.get();
	const { dataChangeAlarm, errorChangeAlarm, querySendChangeAlarm } = useQueryAlarm.change();
	const period = useFormFieldInputString(String(alarm.period));
	const single = useFormFieldSelectString(String(alarm.single));

	const buttonSaveHandler = () => {
		if (!compare.rangeCount(period.value, 1, 20))
			return modalMessageOpen("Период должен быть 0-20 символов!");

		querySendChangeAlarm({
			type: alarm.type,
			single: single.value === "true" ? true : false,
			period: Number(period.value),
		});
	};

	useEffect(() => {
		querySendGetAlarm();
	}, []);

	useEffect(() => {
		period.setValue(String(alarm.period));
		single.setValue(String(alarm.single));
	}, [alarm]);

	useEffect(() => {
		if (!dataGetAlarm) return;

		store.dispatch(alarmAction(dataGetAlarm));
	}, [dataGetAlarm]);

	useEffect(() => {
		if (!errorGetAlarm) return;

		modalMessageOpen(errorGetAlarm.response.data.message);
	}, [errorGetAlarm]);

	useEffect(() => {
		if (!dataChangeAlarm) return;

		modalMessageOpen(dataChangeAlarm.msg);
		querySendGetAlarm();
	}, [dataChangeAlarm]);

	useEffect(() => {
		if (!errorChangeAlarm) return;

		modalMessageOpen(errorChangeAlarm.response.data.message);
	}, [errorChangeAlarm]);

	return (
		<MainScrollWrapper color={true} shadow={true}>
			<LabelWidget value={`Администратор: ${userMyProfile.bio}`} />
			<FormWrapper>
				<LabelWidget value={`Оповещения:`} />
				<SelectFromArrValue
					data={["false", "true"]}
					title={"Одиночные"}
					value={String(single.value)}
					onChange={(e) => single.setValue(e.target.value)}
				/>
				<Input
					value={period.value}
					onChange={(e) => period.setValue(e.target.value)}
					type="period"
					placeholder="Период, сек"
				/>
				<Button value={`Сохранить`} onClick={buttonSaveHandler} />
			</FormWrapper>
		</MainScrollWrapper>
	);
}
