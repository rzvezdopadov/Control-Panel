import React, { useEffect, useState } from "react";
import { ButtonScrollToTop } from "../utils/Buttons/Buttons";
import { invisibleOnScrollToTop } from "../../helpers/scroll";
import { TimeDate } from "../../../../utils/timedate";

export function MainScrollWrapper(payload: {
	children?: React.ReactNode;
	loader?: boolean;
	shadow?: boolean;
	color?: boolean;
	center?: boolean;
}) {
	const scrollTopDiv = React.useRef(null);
	const scrollToTopBtn = React.useRef(null);

	const [timecode, setTimecode] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => setTimecode(TimeDate.getTimecodeNow()), 800);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div
			className={`flex flex-col fixed items-center text-neutral-50 rounded-xl overflow-y-scroll top-20 bottom-4 left-0 right-0 m-auto px-2 pt-2 pb-2 z-0${
				payload.shadow ? " shadow-[0px_0px_2px_2px] shadow-lime-300" : ""
			}${payload.color ? " bg-gray-700" : ""}${
				payload.center ? " justify-center" : " justify-start"
			}`}
			onScroll={(e) => invisibleOnScrollToTop(e, scrollToTopBtn)}
			ref={scrollTopDiv}
		>
			<div className="flex text-2xl w-full justify-center text-white z-10">
				{timecode ? `${TimeDate.getTimeDateFromTimeCode(timecode)}` : "XX.XX.XXXX XX:XX:XX"}
			</div>

			<ButtonScrollToTop scrollTopDiv={scrollTopDiv} scrollToTopBtn={scrollToTopBtn} />
			{payload.children ? payload.children : <></>}
		</div>
	);
}
