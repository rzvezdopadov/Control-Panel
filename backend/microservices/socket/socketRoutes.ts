import { Socket } from "socket.io";
import { socketAPI } from "./socketAPI";
import { SOCKET_COMMAND } from "../../../global/interfaces/isocket";

export function socketRoutes(socketIO: Socket, socket: any) {
	const socketId = socket.id;

	socket.on(SOCKET_COMMAND.ping, (socket: {}) => socketAPI.ping(socketIO, socket, socketId));

	socket.on(SOCKET_COMMAND.getJWT, (socket: { jwt: string }) => {
		socketAPI.getJWT(socketIO, socket, socketId);
	});

	socket.on(SOCKET_COMMAND.disconnect, () => socketAPI.socketClosed(socketId));

	socket.on(SOCKET_COMMAND.changePosition, (socket: { state: boolean }) =>
		socketAPI.changePosition(socketIO, socket, socketId)
	);

	socket.on(SOCKET_COMMAND.clearAllPosition, (socket: {}) =>
		socketAPI.clearAllPosition(socketIO, socket, socketId)
	);
}
