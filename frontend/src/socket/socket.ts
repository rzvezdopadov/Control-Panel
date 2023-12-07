import socketIO from "socket.io-client";
import { SOCKET_COMMAND } from "../../../global/interfaces/isocket";
import { store } from "../store/store";

const socketClient = socketIO(`${window.location.hostname}:8000/`, {
	reconnection: true,
	timeout: 5000,
	transports: ["websocket"],
});

export const socket = {
	connect() {
		socketClient.connect();
	},
	close() {
		socketClient.close();
	},
	endPointAdd(command: SOCKET_COMMAND, clbk?: Function) {
		socketClient.on(command, (socket: any) => {
			if (clbk) clbk(socket);
		});
	},
	endPointDelete(command: SOCKET_COMMAND, clbk?: Function) {
		socketClient.off(command, (socket: any) => {
			if (clbk) clbk(socket);
		});
	},
	send(command: SOCKET_COMMAND, obj: object) {
		socketClient.emit(command, obj);
	},
};

setInterval(() => {
	const { jwt } = store.getState();

	if (jwt) socket.send(SOCKET_COMMAND.ping, {});
}, 5000);
