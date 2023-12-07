import { store } from "../../../store/store";
import { Button } from "../../utils/Buttons/Buttons";
import { MainScrollWrapper } from "../../wrappers/MainScrollWrapper";
import { LabelWidget } from "../../utils/Labels/Labels";
import { Delimiter, Place, PlacesRowWrapper } from "../../utils/Places/Places";
import { SOCKET_COMMAND } from "../../../../../global/interfaces/isocket";
import { socket } from "../../../socket/socket";

export function DispatcherPanel() {
	const { userMyProfile, shop } = store.getState();

	const btnResetClickHandler = () => {
		socket.send(SOCKET_COMMAND.clearAllPosition, {});
	};

	return (
		<MainScrollWrapper color={true} shadow={true}>
			<LabelWidget value={`Диспетчер: ${userMyProfile.bio}`} />

			<div className="flex flex-shrink-0 h-16">
				<Button value={`Сброс`} onClick={btnResetClickHandler} />
			</div>
			<div className="flex flex-grow-0 h-full w-full">
				<div className="flex w-2/5 flex-col items-center bg-lime-900">
					<Delimiter />
					<PlacesRowWrapper>
						<Place value="" invisible={true} />
						<Place value="10.4" colorEn={shop["10.4"]} />
						<Place value="10.3" colorEn={shop["10.3"]} />
						<Place value="10.2" colorEn={shop["10.2"]} />
						<Place value="10.1" colorEn={shop["10.1"]} />
					</PlacesRowWrapper>
					<PlacesRowWrapper>
						<Place value="9.5" colorEn={shop["9.5"]} />
						<Place value="9.4" colorEn={shop["9.4"]} />
						<Place value="9.3" colorEn={shop["9.3"]} />
						<Place value="9.2" colorEn={shop["9.2"]} />
						<Place value="9.1" colorEn={shop["9.1"]} />
					</PlacesRowWrapper>
					<Delimiter />
					<PlacesRowWrapper>
						<Place value="8.5" colorEn={shop["8.5"]} />
						<Place value="8.4" colorEn={shop["8.4"]} />
						<Place value="8.3" colorEn={shop["8.3"]} />
						<Place value="8.2" colorEn={shop["8.2"]} />
						<Place value="8.1" colorEn={shop["8.1"]} />
					</PlacesRowWrapper>
					<PlacesRowWrapper>
						<Place value="7.4" colorEn={shop["7.4"]} />
						<Place value="7.3" colorEn={shop["7.3"]} />
						<Place value="7.2" colorEn={shop["7.2"]} />
						<Place value="7.1" colorEn={shop["7.1"]} />
					</PlacesRowWrapper>
					<Delimiter />
					<PlacesRowWrapper>
						<Place value="6.4" colorEn={shop["6.4"]} />
						<Place value="6.3" colorEn={shop["6.3"]} />
						<Place value="6.2" colorEn={shop["6.2"]} />
						<Place value="6.1" colorEn={shop["6.1"]} />
					</PlacesRowWrapper>
					<PlacesRowWrapper>
						<Place value="5.4" colorEn={shop["5.4"]} />
						<Place value="5.3" colorEn={shop["5.3"]} />
						<Place value="5.2" colorEn={shop["5.2"]} />
						<Place value="5.1" colorEn={shop["5.1"]} />
					</PlacesRowWrapper>
					<Delimiter />
					<PlacesRowWrapper>
						<Place value="4.4" colorEn={shop["4.4"]} />
						<Place value="4.3" colorEn={shop["4.3"]} />
						<Place value="4.2" colorEn={shop["4.2"]} />
						<Place value="4.1" colorEn={shop["4.1"]} />
					</PlacesRowWrapper>
					<PlacesRowWrapper>
						<Place value="3.5" colorEn={shop["3.5"]} />
						<Place value="3.4" colorEn={shop["3.4"]} />
						<Place value="3.3" colorEn={shop["3.3"]} />
						<Place value="3.2" colorEn={shop["3.2"]} />
						<Place value="3.1" colorEn={shop["3.1"]} />
					</PlacesRowWrapper>
					<Delimiter />
					<PlacesRowWrapper>
						<Place value="2.4" colorEn={shop["2.4"]} />
						<Place value="2.3" colorEn={shop["2.3"]} />
						<Place value="2.2" colorEn={shop["2.2"]} />
						<Place value="2.1" colorEn={shop["2.1"]} />
					</PlacesRowWrapper>
					<PlacesRowWrapper>
						<Place value="1.4" colorEn={shop["1.4"]} />
						<Place value="1.3" colorEn={shop["1.3"]} />
						<Place value="1.2" colorEn={shop["1.2"]} />
						<Place value="1.1" colorEn={shop["1.1"]} />
					</PlacesRowWrapper>
					<Delimiter />
				</div>
				<div className="flex w-1/5 flex-col items-center bg-lime-800">
					<Delimiter />
					<Place value="11.1" />
				</div>
				<div className="flex w-2/5 flex-col items-center bg-lime-900">
					<Delimiter />
					<PlacesRowWrapper>
						<Place value="30.1" colorEn={shop["30.1"]} />
						<Place value="30.2" colorEn={shop["30.2"]} />
						<Place value="30.3" colorEn={shop["30.3"]} />
					</PlacesRowWrapper>
					<PlacesRowWrapper>
						<Place value="29.1" colorEn={shop["29.1"]} />
						<Place value="29.2" colorEn={shop["29.2"]} />
						<Place value="29.3" colorEn={shop["29.3"]} />
					</PlacesRowWrapper>
					<Delimiter />
					<PlacesRowWrapper>
						<Place value="28.1" colorEn={shop["28.1"]} />
						<Place value="28.2" colorEn={shop["28.2"]} />
						<Place value="28.3" colorEn={shop["28.3"]} />
					</PlacesRowWrapper>
					<PlacesRowWrapper>
						<Place value="27.1" colorEn={shop["27.1"]} />
						<Place value="27.2" colorEn={shop["27.2"]} />
						<Place value="27.3" colorEn={shop["27.3"]} />
					</PlacesRowWrapper>
					<Delimiter />
					<PlacesRowWrapper>
						<Place value="26.1" colorEn={shop["26.1"]} />
						<Place value="26.2" colorEn={shop["26.2"]} />
						<Place value="" invisible={true} />
					</PlacesRowWrapper>
					<PlacesRowWrapper>
						<Place value="25.1" colorEn={shop["25.1"]} />
						<Place value="25.2" colorEn={shop["25.2"]} />
						<Place value="25.3" colorEn={shop["25.3"]} />
					</PlacesRowWrapper>
					<Delimiter />
					<PlacesRowWrapper>
						<Place value="24.1" colorEn={shop["24.1"]} />
						<Place value="24.2" colorEn={shop["24.2"]} />
						<Place value="24.3" colorEn={shop["24.3"]} />
					</PlacesRowWrapper>
					<PlacesRowWrapper>
						<Place value="23.1" colorEn={shop["23.1"]} />
						<Place value="23.2" colorEn={shop["23.2"]} />
						<Place value="23.3" colorEn={shop["23.3"]} />
					</PlacesRowWrapper>
					<Delimiter />
					<PlacesRowWrapper>
						<Place value="22.1" colorEn={shop["22.1"]} />
						<Place value="22.2" colorEn={shop["22.2"]} />
						<Place value="22.3" colorEn={shop["22.3"]} />
					</PlacesRowWrapper>
				</div>
			</div>
		</MainScrollWrapper>
	);
}
