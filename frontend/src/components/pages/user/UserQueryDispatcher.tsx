import { store } from "../../../store/store";
import { Button } from "../../utils/Buttons/Buttons";
import { FormWrapper } from "../../wrappers/FormWrapper";
import { MainScrollWrapper } from "../../wrappers/MainScrollWrapper";
import { Label, LabelWidget } from "../../utils/Labels/Labels";

export function UserQueryDispatcher() {
	const { userMyProfile } = store.getState();
	const btnUserQueryClickHandler = () => {};

	return (
		<MainScrollWrapper center={true} color={true} shadow={true}>
			<FormWrapper>
				<Label value={`Пользователь: ${userMyProfile.bio}`} />
				<Label value={`Место: ${userMyProfile.place}`} />
				<Label value={`Статус вызова: ${userMyProfile.bio}`} />
				<LabelWidget value={`Вызов диспетчера`} />
				<Button onClick={btnUserQueryClickHandler} value={`Вызвать`} checked={true} />
			</FormWrapper>
		</MainScrollWrapper>
	);
}
