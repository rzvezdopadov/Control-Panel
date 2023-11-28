import { Route, Routes } from "react-router-dom";
import { store } from "../../store/store";
import { MainWrapper } from "../wrappers/MainWrapper";
import { Logout } from "../pages/Logout";
import { Login } from "../pages/Login";
import { UserQueryDispatcher } from "../pages/UserQueryDispatcher";
import { ACCTYPE } from "../../../../global/roles";
import { DispatcherPanel } from "../pages/DispatcherPanel";
import { AdminPanel } from "../pages/AdminPanel";
import { MockPage } from "../pages/MockPage";
import { useQueryGetProfile } from "../../api/profile/profile.api.hook";
import { useEffect } from "react";
import { modalMessageOpen } from "../modal/ModalMessage";
import { userMyProfileAction } from "../../store/reducers/profile";

export function AppMain() {
	const { jwt, userMyProfile } = store.getState();
	const { dataGetProfile, errorGetProfile, querySendGetProfile } = useQueryGetProfile();

	useEffect(() => {
		if (jwt) {
			setTimeout(() => querySendGetProfile({ userid: "0" }), 200);
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
									<Route path="/*" element={<AdminPanel />} />
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
		</MainWrapper>
	);
}
