import { IShop } from "../../../global/interfaces/ishop";
import { ACCTYPE } from "../../../global/roles";
import { shopAction } from "../store/reducers/shop";
import { store } from "../store/store";

let timer: boolean = false;

function playSound() {
	const alarm = require("../assets/sound/alarm.mp3");
	const soundAlarm = new Audio(alarm.default);
	const soundAlarmPromise = soundAlarm.play();

	soundAlarmPromise.then(() => {}).catch((error) => {});
}

export function alarmHandler(shop: IShop) {
	store.dispatch(shopAction(shop));

	const { userMyProfile, alarm } = store.getState();
	if (userMyProfile.acctype !== ACCTYPE.dispatcher) return;

	let shopEn = false;

	for (const key in shop) {
		if (shop[key as unknown as keyof IShop]) {
			shopEn = true;
			break;
		}
	}

	if (shopEn) {
		if (!alarm.single) {
			const timeout = () => {
				setTimeout(() => {
					playSound();
					if (timer) timeout();
				}, alarm.period * 1000);
			};

			if (!timer) {
				playSound();
				timeout();
			}

			timer = true;
		} else {
			playSound();
		}
	} else {
		if (timer) {
			timer = false;
		}
	}
}
