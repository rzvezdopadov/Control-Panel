import "./App.css";
import { ModalLoading } from "./components/modal/ModalLoading";
import { AppHeader } from "./components/selections/AppHeader";
import { AppMain } from "./components/selections/AppMain";

function App() {
	return (
		<div className="App">
			<AppHeader />
			<AppMain />
			<ModalLoading />
		</div>
	);
}

export default App;
