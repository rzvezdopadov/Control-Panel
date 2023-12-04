import { store } from "../../../store/store";
import { LabelWidget } from "../../utils/Labels/Labels";
import { MainScrollWrapper } from "../../wrappers/MainScrollWrapper";

export function AdminAlarm() {
	const { userMyProfile } = store.getState();

	return (
		<MainScrollWrapper color={true} shadow={true}>
			<LabelWidget value={`Администратор: ${userMyProfile.bio}`} />
		</MainScrollWrapper>
	);
}
