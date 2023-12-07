import { store } from "../../../store/store";
import { Button } from "../../utils/Buttons/Buttons";
import { FormWrapper } from "../../wrappers/FormWrapper";
import { MainScrollWrapper } from "../../wrappers/MainScrollWrapper";
import { Label, LabelWidget } from "../../utils/Labels/Labels";
import { socket } from "../../../socket/socket";
import { SOCKET_COMMAND } from "../../../../../global/interfaces/isocket";
import { IShop } from "../../../../../global/interfaces/ishop";

export function UserQueryDispatcher() {
	const { userMyProfile, shop } = store.getState();
	const btnUserQueryClickHandler = () => {
		if (shop[userMyProfile.place as unknown as keyof IShop]) {
			socket.send(SOCKET_COMMAND.changePosition, { state: false });
		} else {
			socket.send(SOCKET_COMMAND.changePosition, { state: true });
		}
	};

	return (
		<MainScrollWrapper center={true} color={true} shadow={true}>
			<FormWrapper>
				<Label value={`Пользователь: ${userMyProfile.bio}`} />
				<Label value={`Место: ${userMyProfile.place}`} />
				<Label
					value={`Статус вызова: ${
						shop[userMyProfile.place as unknown as keyof IShop]
							? "Вызван"
							: "Можно вызвать"
					}`}
				/>
				<LabelWidget value={`Вызов диспетчера`} />
				<Button
					onClick={btnUserQueryClickHandler}
					value={`${
						shop[userMyProfile.place as unknown as keyof IShop]
							? "Отменить вызов"
							: "Вызвать"
					}`}
					color={shop[userMyProfile.place as unknown as keyof IShop] ? "bg-red-600" : ""}
				/>
			</FormWrapper>
		</MainScrollWrapper>
	);
}
