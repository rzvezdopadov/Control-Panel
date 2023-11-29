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

export function AdminPanel() {
	const { userMyProfile } = store.getState();
	const [profiles, setProfiles] = useState<IProfile[]>([]);

	const { dataGetProfiles, errorGetProfiles, querySendGetProfiles } = useQueryProfiles.get();

	useEffect(() => {
		querySendGetProfiles({
			acctype: ACCTYPE.user,
		});
	}, []);

	useEffect(() => {
		if (!dataGetProfiles) return;

		setProfiles(dataGetProfiles);
	}, [dataGetProfiles]);

	useEffect(() => {
		if (!errorGetProfiles) return;

		modalMessageOpen(errorGetProfiles.response.data.message);
	}, [errorGetProfiles]);

	return (
		<MainScrollWrapper color={true} shadow={true}>
			<LabelWidget value={`Администратор: ${userMyProfile.bio}`} />
			<Button value={`Добавить пользователя`} />
			<Table
				headTitle={["Место", "ФИО", "Логин", "Тип аккаунта", "userID"]}
				propertySeq={["place", "bio", "login", "acctype", "userid"]}
				data={profiles}
			></Table>
		</MainScrollWrapper>
	);
}
