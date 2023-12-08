import { Route, Routes } from "react-router-dom";
import { store } from "../../store/store";
import { MainWrapper } from "../wrappers/MainWrapper";
import { Logout } from "../pages/Logout";
import { Login } from "../pages/Login";
import { UserQueryDispatcher } from "../pages/user/UserQueryDispatcher";
import { ACCTYPE } from "../../../../global/roles";
import { DispatcherPanel } from "../pages/dispatcher/DispatcherPanel";
import { AdminUsers } from "../pages/admin/AdminUsers";
import { MockPage } from "../pages/MockPage";
import { useQueryProfile } from "../../api/profile/profile.api.hook";
import { useEffect } from "react";
import { modalMessageOpen } from "../modal/ModalMessage";
import { userMyProfileAction } from "../../store/reducers/profile";
import { AdminAlarm } from "../pages/admin/AdminAlarm";
import { Socket } from "../utils/Socket";
import { socket } from "../../socket/socket";
import { SOCKET_COMMAND } from "../../../../global/interfaces/isocket";
import { useQueryAlarm } from "../../api/alarm/alarm.api.hook";
import { alarmAction } from "../../store/reducers/alarm";

export function AppMain() {
	const { jwt, userMyProfile } = store.getState();
	const { dataGetProfile, errorGetProfile, querySendGetProfile } = useQueryProfile.get();
	const { dataGetAlarm, errorGetAlarm, querySendGetAlarm } = useQueryAlarm.get();

	useEffect(() => {
		if (jwt) {
			setTimeout(() => querySendGetProfile({ userid: "0" }), 200);
			setTimeout(() => querySendGetAlarm(), 400);
			socket.send(SOCKET_COMMAND.getJWT, { jwt });
		}
	}, [jwt]);

	useEffect(() => {
		if (!dataGetProfile) return;

		store.dispatch(userMyProfileAction(dataGetProfile));
	}, [dataGetProfile]);

	useEffect(() => {
		if (!errorGetProfile) return;

		modalMessageOpen(errorGetProfile.response.data.message);
	}, [errorGetProfile]);

	useEffect(() => {
		if (!dataGetAlarm) return;

		store.dispatch(alarmAction(dataGetAlarm));
	}, [dataGetAlarm]);

	useEffect(() => {
		if (!errorGetAlarm) return;

		modalMessageOpen(errorGetAlarm.response.data.message);
	}, [errorGetAlarm]);

	return (
		<MainWrapper>
			<Routes>
				{jwt ? (
					<>
						<Route path="/logout" element={<Logout />} />
						{userMyProfile.userid !== "" ? (
							userMyProfile.acctype === ACCTYPE.user ? (
								<>
									<Route path="/*" element={<UserQueryDispatcher />} />
								</>
							) : userMyProfile.acctype === ACCTYPE.dispatcher ? (
								<>
									<Route path="/*" element={<DispatcherPanel />} />
								</>
							) : userMyProfile.acctype === ACCTYPE.admin ? (
								<>
									<Route path="/alarm" element={<AdminAlarm />} />
									<Route path="/*" element={<AdminUsers />} />
								</>
							) : (
								<>
									<Route path="/*" element={<MockPage />} />
								</>
							)
						) : (
							<>
								<Route path="/*" element={<MockPage />} />
							</>
						)}
					</>
				) : (
					<>
						<Route path="/*" element={<Login />} />
					</>
				)}
			</Routes>
			{jwt ? <Socket></Socket> : <></>}
		</MainWrapper>
	);
}
