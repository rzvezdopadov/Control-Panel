import { logout } from "../../helpers/logout";
import { useEffect } from "react";

export function Logout() {
	useEffect(() => {
		logout();
	}, []);

	return <></>;
}
