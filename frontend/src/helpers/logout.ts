import { getCookiesJWT } from "./cookie";
import { store } from "../store/store";
import { jwtAction } from "../store/reducers/auth";

export function logout() {
	const jwt = getCookiesJWT();

	document.cookie = `jwt=${jwt}; max-age=${-1}`;
	store.dispatch(jwtAction(""));
}
