import { useEffect, useState } from "react";
import { Random } from "../../../../utils/random";
import { convertTextToSign } from "../../helpers/convert";

const snowflakes_type_arr = ["&#10052;", "&#10053;", "&#10054;"];

const holidayObj_count = 50;

interface IHolidayObj {
	type: number;
	size: number;
	posX: number;
	posY: number;
	deg: number;
}

export function Holiday() {
	const [holidaysObj, setHolidaysObj] = useState<IHolidayObj[]>([]);

	function holidaysObjTimerHandler(holidayObj: IHolidayObj[]) {
		setTimeout(() => {
			const holidaysObjNew = [...holidayObj];

			if (!holidaysObjNew.length) {
				for (let i = 0; i < holidayObj_count; i++) {
					const holidayObj: IHolidayObj = {
						type: Random.getRandomInteger(0, snowflakes_type_arr.length - 1),
						size: Random.getRandomInteger(10, 30),
						posX: Random.getRandomInteger(0, window.innerWidth),
						posY: Random.getRandomInteger(0, window.innerHeight),
						deg: Random.getRandomInteger(0, 360),
					};

					holidaysObjNew.push(holidayObj);
				}
			} else {
				for (let i = 0; i < holidaysObjNew.length; i++) {
					holidaysObjNew[i].posX += (15 - Random.getRandomInteger(0, 30)) / 30;
					if (holidaysObjNew[i].posX > window.innerWidth - holidaysObj[i].size * 1.5) {
						holidaysObjNew[i].posX = window.innerWidth - holidaysObj[i].size * 1.5;
					} else if (holidaysObjNew[i].posX < holidaysObj[i].size * 1.5) {
						holidaysObjNew[i].posX = holidaysObj[i].size * 1.5;
					}

					holidaysObjNew[i].posY += Random.getRandomInteger(0, 100) / 100;

					if (holidaysObjNew[i].posY > window.innerHeight - holidaysObj[i].size * 1.5) {
						holidaysObjNew[i].type = Random.getRandomInteger(
							0,
							snowflakes_type_arr.length - 1
						);
						holidaysObjNew[i].posX = Random.getRandomInteger(0, window.innerWidth);
						holidaysObjNew[i].posY = -100;
						holidaysObjNew[i].size = Random.getRandomInteger(10, 30);
					}

					holidaysObjNew[i].deg += Random.getRandomInteger(0, 100) / 200;
					if (holidaysObjNew[i].deg > 360) holidaysObjNew[i].deg = 0;
				}
			}

			setHolidaysObj(holidaysObjNew);
		}, 10);
	}

	useEffect(() => {
		holidaysObjTimerHandler(holidaysObj);
	}, []);

	useEffect(() => {
		holidaysObjTimerHandler(holidaysObj);
	}, [holidaysObj]);

	return (
		<>
			{holidaysObj ? (
				holidaysObj.map((value, index) => {
					return (
						<div
							className="absolute text-white select-none"
							key={`holiday${index}`}
							style={{
								fontSize: `${value.size}px`,
								left: value.posX,
								top: value.posY,
								transform: `rotate(${value.deg}deg)`,
							}}
						>
							{convertTextToSign(snowflakes_type_arr[value.type])}
						</div>
					);
				})
			) : (
				<></>
			)}
		</>
	);
}
