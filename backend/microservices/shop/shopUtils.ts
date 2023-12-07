import { shop } from "./shop";

export const shopUtils = {
	get() {
		return shop.get();
	},
	setPos(index: string, state: boolean) {
		let shopNew = shop.get();

		if (Object.keys(shopNew).includes(index)) shopNew[index] = state;

		shop.set(shopNew);

		return shopNew;
	},
	clearAllPos() {
		let shopNew = shop.get();

		Object.keys(shopNew).forEach((value) => (shopNew[value] = false));

		shop.set(shopNew);

		return shopNew;
	},
};
