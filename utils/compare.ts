export const compare = {
	rangeCountChr(str: string, min: number, max: number) {
		const size = str.length;

		if (size < min || size > max) return false;

		return true;
	},
	rangeCount(value: string | number, min: number, max: number) {
		const valueNew = Number(value);

		if (valueNew < min || valueNew > max) return false;

		return true;
	},
};
