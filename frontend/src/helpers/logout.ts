import { getCookiesJWT } from "./cookie";
import { store } from "../store/store";
import { jwtAction } from "../store/reducers/auth";
import { initialStateUserMyProfile, userMyProfileAction } from "../store/reducers/profile";

export function logout() {
	const jwt = getCookiesJWT();

	document.cookie = `jwt=${jwt}; max-age=${-1}`;
	store.dispatch(jwtAction(""));
	store.dispatch(userMyProfileAction(initialStateUserMyProfile));
	document.location.href = "/";
}
