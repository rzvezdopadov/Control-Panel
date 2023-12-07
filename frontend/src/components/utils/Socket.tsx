import { useEffect } from "react";
import { socket } from "../../socket/socket";
import { SOCKET_COMMAND } from "../../../../global/interfaces/isocket";
import { IShop } from "../../../../global/interfaces/ishop";
import { store } from "../../store/store";
import { shopAction } from "../../store/reducers/shop";

export function Socket() {
	useEffect(() => {
		socket.connect();
		socket.endPointAdd(SOCKET_COMMAND.getJWT, () => {
			const { jwt } = store.getState();
			socket.send(SOCKET_COMMAND.getJWT, { jwt: jwt });
		});
		socket.endPointAdd(SOCKET_COMMAND.setState, (shop: IShop) => {
			store.dispatch(shopAction(shop));
		});

		return () => {
			socket.endPointDelete(SOCKET_COMMAND.getJWT);
			socket.endPointDelete(SOCKET_COMMAND.setState);
			socket.close();
		};
	}, []);

	return <></>;
}
