import { store } from "../../store/store";
import { MainScrollWrapper } from "../wrappers/MainScrollWrapper";
import { LabelWidget } from "../utils/Labels/Labels";
import { useEffect, useState } from "react";
import { IProfile } from "../interfaces/iprofiles";
import { useQueryProfiles } from "../../api/profile/profile.api.hook";
import { modalMessageOpen } from "../modal/ModalMessage";
import { ACCTYPE } from "../../../../global/roles";
import { Table } from "../utils/Tables/Tables";
import { Button } from "../utils/Buttons/Buttons";
import { ModalUserCreate } from "../modal/ModalUserCreate";
import { useFormVisible } from "../../hooks/form.hook";
import { userProfilesAction } from "../../store/reducers/profile";

export function AdminPanel() {
	const { userMyProfile, userProfiles } = store.getState();
	const { dataGetProfiles, errorGetProfiles, querySendGetProfiles } = useQueryProfiles.get();

	useEffect(() => {
		querySendGetProfiles({
			acctype: ACCTYPE.user,
		});
	}, []);

	useEffect(() => {
		if (!dataGetProfiles) return;

		store.dispatch(userProfilesAction(dataGetProfiles));
	}, [dataGetProfiles]);

	useEffect(() => {
		if (!errorGetProfiles) return;

		modalMessageOpen(errorGetProfiles.response.data.message);
	}, [errorGetProfiles]);

	const formModalAddUserVisible = useFormVisible(false);

	return (
		<MainScrollWrapper color={true} shadow={true}>
			<LabelWidget value={`Администратор: ${userMyProfile.bio}`} />
			<Button
				value={`Добавить пользователя`}
				onClick={() => formModalAddUserVisible.setVisible(true)}
			/>
			<Table
				headTitle={["Место", "ФИО", "Логин", "Тип аккаунта", "userID"]}
				propertySeq={["place", "bio", "login", "acctype", "userid"]}
				data={userProfiles}
			/>
			<ModalUserCreate formVisible={formModalAddUserVisible} />
		</MainScrollWrapper>
	);
}
