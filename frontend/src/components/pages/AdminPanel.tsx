import { store } from "../../store/store";
import { FormWrapper } from "../wrappers/FormWrapper";
import { MainScrollWrapper } from "../wrappers/MainScrollWrapper";
import { LabelWidget } from "../utils/Labels/Labels";

export function AdminPanel() {
	const { userMyProfile } = store.getState();

	return (
		<MainScrollWrapper center={true} color={true} shadow={true}>
			<LabelWidget value={`Администратор: ${userMyProfile.bio}`} />
			<FormWrapper></FormWrapper>
		</MainScrollWrapper>
	);
}
