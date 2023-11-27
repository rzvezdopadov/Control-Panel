export const normalize = {
	deleteSpace(str: string): string {
		if (!str) return "";
		if (typeof str !== "string") return "";

		str = str.replace(/[' ']/g, "");

		return str;
	},
	deleteDot(str: string): string {
		if (!str) return "";
		if (typeof str !== "string") return "";

		str = str.replace(/['.']/g, "");

		return str;
	},
	deleteEmptyString(arr: String[]) {
		const newArr: String[] = [];

		arr.forEach((str) => {
			if (typeof str === "string") {
				newArr.push(normalize.deleteSpace(str));
			}
		});

		return newArr;
	},
	number(num: number): number {
		const type = typeof num;

		if (!(type === "number" || type === "string")) return 0;

		const newNum = Number(num);

		if (Number.isNaN(newNum)) return 0;

		return newNum;
	},
};
