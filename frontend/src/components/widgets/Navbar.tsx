import peoples from "../../assets/img/peoples.png";

export function Navbar() {
	return (
		<div className="flex items-center">
			<img
				className="block h-12 rounded-full w-auto border-lime-400 border-2"
				src={peoples}
				alt="Logo"
			/>
			<span className="m-4 text-lg text-gray-200">Диспетчерский пульт</span>
		</div>
	);
}
