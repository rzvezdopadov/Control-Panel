import { ILink } from "../../interfaces/inavigation";
import { Link } from "react-router-dom";
import { ButtonNaviWrapper } from "./ButtonsWrapper";
import React, { MouseEventHandler } from "react";
import { scrollToTop } from "../../../helpers/scroll";

export const Button = React.forwardRef(
	(
		payload: {
			value?: string;
			onClick?: React.MouseEventHandler<HTMLButtonElement>;
			color?: string;
			checked?: boolean;
		},
		ref: React.Ref<HTMLButtonElement>
	) => {
		return (
			<div className="flex items-center justify-center m-1">
				<button
					className={
						"flex items-center select-none text-white shadow-[0px_0px_2px_2px] shadow-lime-300 m-1 py-2 px-4 h-6 rounded-md" +
						(payload.checked === true
							? " bg-yellow-600 cursor-auto"
							: " bg-lime-600 hover:bg-lime-800 cursor-pointer") +
						(payload.color ? ` ${payload.color}` : "")
					}
					type="button"
					ref={ref}
					onClick={payload.onClick ? payload.onClick : () => {}}
				>
					{payload.value ? payload.value : <></>}
				</button>
			</div>
		);
	}
);

export function ButtonNavigationLink(payload: { link: ILink; naviKey: string }) {
	return (
		<Link to={payload.link.to}>
			<ButtonNaviWrapper>
				{payload.link.imgSrc ? (
					<div className="flex h-10 w-10 justify-center items-center cursor-pointer">
						<img
							className="flex h-5 w-6 rounded-sm"
							src={String(payload.link.imgSrc)}
							alt={payload.link.title}
							title={payload.link.title}
						/>
					</div>
				) : (
					<div className="flex h-10 w-fit px-2 justify-center items-center cursor-pointer">
						<label className="flex text-white w-fit cursor-pointer">
							{payload.link.title}
						</label>
					</div>
				)}
			</ButtonNaviWrapper>
		</Link>
	);
}

export function ButtonClose(payload: {
	title?: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
	return (
		<div className="flex justify-center h-6 w-full">
			<button
				onClick={payload.onClick ? payload.onClick : () => {}}
				className="flex justify-center absolute right-0 m-4 cursor-pointer rounded-full select-none bg-red-500 shadow-[0px_0px_2px_2px] shadow-lime-300 h-6 w-6 z-10"
				title={payload.title ? payload.title : ""}
			>
				X
			</button>
		</div>
	);
}

export function ButtonScrollToTop(payload: {
	scrollTopDiv: React.MutableRefObject<null>;
	scrollToTopBtn: React.RefObject<HTMLDivElement>;
}) {
	return (
		<div
			ref={payload.scrollToTopBtn}
			onClick={() => {
				scrollToTop(payload.scrollTopDiv);
			}}
			className="flex fixed invisible right-0 m-4 bg-slate-900 rotate-[270deg] shadow-[0px_0px_2px_2px] shadow-lime-300 justify-center items-center flex-shrink-0 h-12 w-12 text-3xl rounded-full cursor-pointer z-10"
		>
			<div className="mb-0.5 ml-0.5">&#10148;</div>
		</div>
	);
}
