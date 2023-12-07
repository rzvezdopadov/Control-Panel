import { Socket } from "socket.io";
import { ISocketUsers } from "./isocket";
import { SOCKET_COMMAND } from "../../../global/interfaces/isocket";

export const socketUtils = {
	getUserIdFromSocketTable(sockets: ISocketUsers[], socketId: ISocketUsers["socketid"]) {
		for (let i = 0; i < sockets.length; i++) {
			if (sockets[i].socketid === socketId) {
				return sockets[i].userid;
			}
		}

		return "";
	},
	sendToAllSocketsById<TPayload>(
		socketIO: Socket,
		sockets: ISocketUsers[],
		useridarr: string[],
		nameCommand: SOCKET_COMMAND,
		payload: TPayload
	) {
		sockets.forEach((socketuser) => {
			if (useridarr.includes(socketuser.userid) || useridarr.length === 0)
				socketIO.to(socketuser.socketid).emit(nameCommand, payload);
		});
	},
};
