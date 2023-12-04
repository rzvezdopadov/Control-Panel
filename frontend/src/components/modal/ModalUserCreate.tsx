import { Button } from "../utils/Buttons/Buttons";
import { Input } from "../utils/Inputs/Inputs";
import { LabelWidget } from "../utils/Labels/Labels";
import {
	useFormFieldInputString,
	useFormFieldSelectString,
	useFormVisible,
} from "../../hooks/form.hook";
import { ModalCloseFormWrapper } from "../wrappers/ModalFormWrapper";
import { SelectFromArrValue } from "../utils/Selects/Selects";
import { ACCTYPE } from "../../../../global/roles";
import { useQueryProfile, useQueryProfiles } from "../../api/profile/profile.api.hook";
import { compare } from "../../../../utils/compare";
import { modalMessageOpen } from "./ModalMessage";
import { useEffect } from "react";

export function ModalUserCreate(payload: {
	formVisible: ReturnType<typeof useFormVisible>;
	profileUpdate?: Function;
}) {
	const { dataCreateProfile, errorCreateProfile, querySendCreateProfile } =
		useQueryProfile.create();
	const login = useFormFieldInputString("");
	const password = useFormFieldInputString("");
	const bio = useFormFieldInputString("");
	const place = useFormFieldInputString("");
	const acctype = useFormFieldSelectString(ACCTYPE.user as string);

	const buttonSaveHandler = () => {
		if (!compare.rangeCountChr(login.value, 5, 30))
			return modalMessageOpen("Логин должен быть 5-30 символов!");
		if (!compare.rangeCountChr(password.value, 8, 30))
			return modalMessageOpen("Пароль должен быть 8-30 символов!");
		if (!compare.rangeCountChr(bio.value, 3, 50))
			return modalMessageOpen("ФИО должно быть 3-50 символов!");
		if (!compare.rangeCountChr(place.value, 1, 5))
			return modalMessageOpen("Место должно быть 1-5 символов!");

		querySendCreateProfile({
			login: login.value,
			password: password.value,
			place: place.value,
			acctype: acctype.value as ACCTYPE,
			bio: bio.value,
		});
	};

	useEffect(() => {
		if (!dataCreateProfile) return;

		payload.formVisible.setVisible(false);
		modalMessageOpen("Успешно сохранено!");
		if (payload.profileUpdate) payload.profileUpdate();

		login.setValue("");
		password.setValue("");
		bio.setValue("");
		place.setValue("");
		acctype.setValue(ACCTYPE.user);
	}, [dataCreateProfile]);

	useEffect(() => {
		if (!errorCreateProfile) return;

		modalMessageOpen(errorCreateProfile.response.data.message);
	}, [errorCreateProfile]);

	return (
		<ModalCloseFormWrapper formVisible={payload.formVisible}>
			<LabelWidget value="Создать пользователя" />
			<Input {...login} type="login" placeholder="Логин" />
			<Input {...password} type="password" placeholder="Пароль" />
			<Input {...bio} type="bio" placeholder="ФИО" />
			<Input {...place} type="place" placeholder="Место" />
			<SelectFromArrValue
				data={[ACCTYPE.user, ACCTYPE.dispatcher, ACCTYPE.admin]}
				title={"Тип аккаунта"}
				{...acctype}
			/>
			<Button value="Сохранить" onClick={buttonSaveHandler}></Button>
		</ModalCloseFormWrapper>
	);
}
