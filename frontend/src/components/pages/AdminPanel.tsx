import { store } from "../../store/store";
import { MainScrollWrapper } from "../wrappers/MainScrollWrapper";
import { LabelWidget } from "../utils/Labels/Labels";
import { useEffect, useState } from "react";
import { useQueryProfile, useQueryProfiles } from "../../api/profile/profile.api.hook";
import { modalMessageOpen } from "../modal/ModalMessage";
import { ACCTYPE } from "../../../../global/roles";
import { Table } from "../utils/Tables/Tables";
import { Button } from "../utils/Buttons/Buttons";
import { ModalUserCreate } from "../modal/ModalUserCreate";
import { useFormVisible } from "../../hooks/form.hook";
import { userProfilesAction } from "../../store/reducers/profile";
import { SelectFromArrValue } from "../utils/Selects/Selects";
import { IQueryDeleteProfile } from "../../api/profile/iprofile.api";

export function AdminPanel() {
	const { userMyProfile, userProfiles } = store.getState();
	const { dataGetProfiles, errorGetProfiles, querySendGetProfiles } = useQueryProfiles.get();
	const { dataDeleteProfile, errorDeleteProfile, querySendDeleteProfile } =
		useQueryProfile.delete();
	const [acctypeSearch, setAcctypeSearch] = useState(ACCTYPE.user);

	const querySendGetProfilesLocal = () => {
		querySendGetProfiles({
			acctype: acctypeSearch as ACCTYPE,
		});
	};

	const querySendDeleteProfileLocal = (obj: object) => {
		querySendDeleteProfile({ ...obj } as IQueryDeleteProfile);

		setTimeout(() => querySendGetProfilesLocal(), 1000);
	};

	useEffect(() => {
		querySendGetProfilesLocal();
	}, [acctypeSearch]);

	useEffect(() => {
		if (!dataGetProfiles) return;

		store.dispatch(userProfilesAction(dataGetProfiles));
	}, [dataGetProfiles]);

	useEffect(() => {
		if (!errorGetProfiles) return;

		modalMessageOpen(errorGetProfiles.response.data.message);
	}, [errorGetProfiles]);

	useEffect(() => {
		if (!dataDeleteProfile) return;

		querySendGetProfilesLocal();
	}, [dataDeleteProfile]);

	useEffect(() => {
		if (!errorDeleteProfile) return;

		modalMessageOpen(errorDeleteProfile.response.data.message);
	}, [errorDeleteProfile]);

	const formModalAddUserVisible = useFormVisible(false);

	return (
		<MainScrollWrapper color={true} shadow={true}>
			<LabelWidget value={`Администратор: ${userMyProfile.bio}`} />
			<Button
				value={`Добавить пользователя`}
				onClick={() => formModalAddUserVisible.setVisible(true)}
			/>
			<SelectFromArrValue
				data={[ACCTYPE.user, ACCTYPE.dispatcher, ACCTYPE.admin]}
				title={"Тип аккаунта"}
				value={acctypeSearch}
				onChange={(e) => setAcctypeSearch(e.target.value as ACCTYPE)}
			/>
			<Table
				headTitle={["Место", "ФИО", "Логин", "Тип аккаунта", "userID"]}
				propertySeq={["place", "bio", "login", "acctype", "userid"]}
				data={userProfiles}
				delete={{ property: "userid", clbk: querySendDeleteProfileLocal }}
			/>
			<ModalUserCreate formVisible={formModalAddUserVisible} />
		</MainScrollWrapper>
	);
}
