import { ILink } from "../interfaces/inavigation";
import { Link } from "react-router-dom";
import { ButtonNaviWrapper } from "../wrappers/ButtonsWrapper";

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
