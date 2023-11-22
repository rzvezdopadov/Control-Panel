import { Navigation } from "../widgets/Navigation";
import { Navbar } from "../widgets/Navbar";
import { NavbarWrapper } from "../wrappers/NavbarWrapper";

export function AppHeader() {
	return (
		<NavbarWrapper>
			<Navbar></Navbar>
			<div className="hidden md:flex">
				<Navigation naviKey={"header"} />
			</div>
		</NavbarWrapper>
	);
}
