function getCookie(name: string): string {
	const nameLenPlus = name.length + 1;

	let cookie = document.cookie;

	cookie = cookie
		.split(";")
		.map((c) => c.trim())
		.filter((cookie) => {
			return cookie.substring(0, nameLenPlus) === `${name}=`;
		})
		.map((cookie) => {
			return decodeURIComponent(cookie.substring(nameLenPlus));
		})[0];

	if (!cookie) return "";

	return cookie;
}

export function getCookiesJWT(): string {
	return getCookie("jwt");
}
