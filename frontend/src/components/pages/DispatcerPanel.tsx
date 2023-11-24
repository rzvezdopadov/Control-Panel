import { store } from "../../store/store";
import { Button } from "../utils/Buttons/Buttons";
import { FormWrapper } from "../wrappers/FormWrapper";
import { MainScrollWrapper } from "../wrappers/MainScrollWrapper";
import { LabelWidget } from "../utils/Labels/Labels";

export function DispatcherPanel() {
	const { userMyProfile } = store.getState();

	const btnResetClickHandler = () => {};

	return (
		<MainScrollWrapper center={true} color={true} shadow={true}>
			<LabelWidget value={`Диспетчер: ${userMyProfile.bio}`} />
			<FormWrapper>
				<Button value={`Сброс`} onClick={btnResetClickHandler} />
			</FormWrapper>
		</MainScrollWrapper>
	);
}
