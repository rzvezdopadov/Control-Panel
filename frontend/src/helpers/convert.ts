export function convertTextToSign(str: string) {
	let txt = new DOMParser().parseFromString(str, "text/html");

	return txt.documentElement.textContent;
}
