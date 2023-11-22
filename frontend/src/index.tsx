import "./index.css";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);

let renderEntireTree = () => {
	root.render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
};

renderEntireTree();
