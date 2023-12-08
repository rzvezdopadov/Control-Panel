import "./App.css";
import { Holiday } from "./components/additions/Holiday";
import { ModalLoading } from "./components/modal/ModalLoading";
import { ModalMessage } from "./components/modal/ModalMessage";
import { AppHeader } from "./components/selections/AppHeader";
import { AppMain } from "./components/selections/AppMain";

function App() {
	return (
		<div className="App">
			<AppHeader />
			<AppMain />
			<ModalLoading />
			<ModalMessage />
			<Holiday />
		</div>
	);
}

export default App;
