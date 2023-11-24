import { Route, Routes } from "react-router-dom";
import { store } from "../../store/store";
import { MainWrapper } from "../wrappers/MainWrapper";
import { Logout } from "../pages/Logout";
import { Login } from "../pages/Login";
import { UserQueryDispatcher } from "../pages/UserQueryDispatcher";

export function AppMain() {
	const { jwt, userMyProfile } = store.getState();

	return (
		<MainWrapper>
			<Routes>
				{jwt ? (
					userMyProfile?.userid !== "" ? (
						<>
							<Route path="/logout" element={<Logout />} />

							<Route path="/*" element={<Login />} />
						</>
					) : (
						<Route path="/*" element={<></>} />
					)
				) : (
					<>
						<Route path="/login" element={<Login />} />

						<Route path="/*" element={<UserQueryDispatcher />} />
					</>
				)}
			</Routes>
		</MainWrapper>
	);
}
