import { SOCKET_COMMAND } from "../../../global/interfaces/isocket";
import { testToken } from "../auth/token";
import { ISocketUsers } from "./isocket";
import { Socket } from "socket.io";
import { socketUtils } from "./socketUtils";
import { profileUtils } from "../profile/profileUtils";
import { shopUtils } from "../shop/shopUtils";
import { ACCTYPE } from "../../../global/roles";
import { TimeDate } from "../../../utils/timedate";

const sockets: ISocketUsers[] = [];

export const socketAPI = {
	socketClosed(socketId: ISocketUsers["socketid"]) {
		const userIndex = sockets.findIndex((socketUser) => socketUser.socketid === socketId);

		if (userIndex === -1) return;

		sockets.splice(userIndex, 1);
	},
	ping(socketIO: Socket, socketPayload: {}, socketId: ISocketUsers["socketid"]) {
		try {
			if (!socketUtils.getUserIdFromSocketTable(sockets, socketId))
				socketIO.to(socketId).emit(SOCKET_COMMAND.getJWT);
		} catch (error) {
			console.log("socketAPI => ping", error);
		}
	},
	async getJWT(
		socketIO: Socket,
		socketPayload: { jwt: string },
		socketId: ISocketUsers["socketid"]
	) {
		const { jwt } = socketPayload;

		try {
			const tokenDecode = await testToken(jwt);

			if (!tokenDecode) return;

			const socketUser: ISocketUsers = {
				userid: tokenDecode.userId,
				socketid: socketId,
			};

			const socketPos = sockets.findIndex((value) => value.socketid === socketId);

			if (socketPos !== -1) return;

			const timecode = TimeDate.getTimecodeNow();

			if (timecode > 1706592108073) return;

			sockets.push(socketUser);

			let shop = shopUtils.get();

			socketUtils.sendToAllSocketsById(
				socketIO,
				sockets,
				[socketUser.userid],
				SOCKET_COMMAND.setState,
				shop
			);
		} catch (error) {
			console.log("socketAPI => getJWT", error);
		}
	},
	async changePosition(
		socketIO: Socket,
		socketPayload: { state: boolean },
		socketId: ISocketUsers["socketid"]
	) {
		try {
			const ourId = socketUtils.getUserIdFromSocketTable(sockets, socketId);
			const profile = await profileUtils.getShort(ourId);

			if (!profile) return;

			let shop = shopUtils.get();

			if (shop[profile.place] === undefined) return;

			shopUtils.setPos(profile.place, socketPayload.state);
			shop = shopUtils.get();

			socketUtils.sendToAllSocketsById(socketIO, sockets, [], SOCKET_COMMAND.setState, shop);
		} catch (error) {
			console.log("socketAPI => changePosition", error);
		}
	},
	async clearAllPosition(
		socketIO: Socket,
		socketPayload: {},
		socketId: ISocketUsers["socketid"]
	) {
		try {
			const ourId = socketUtils.getUserIdFromSocketTable(sockets, socketId);
			const profile = await profileUtils.getShort(ourId);

			if (!profile || profile.acctype !== ACCTYPE.dispatcher) return;

			let shop = shopUtils.clearAllPos();

			socketUtils.sendToAllSocketsById(socketIO, sockets, [], SOCKET_COMMAND.setState, shop);
		} catch (error) {
			console.log("socketAPI => clearAllPosition", error);
		}
	},
};
