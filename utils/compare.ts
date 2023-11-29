export const compare = {
	rangeCountChr(str: string, min: number, max: number) {
		const size = str.length;

		if (size < min || size > max) return false;

		return true;
	},
};
