import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { StateProvider } from "./store";

if (process.env.NODE_ENV === "development") {
	const whyDidYouRender = require("@welldone-software/why-did-you-render");
	whyDidYouRender(React, {
		trackAllPureComponents: true,
	});
}

ReactDOM.render(
	<React.StrictMode>
		<StateProvider>
			<App />
		</StateProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

serviceWorker.unregister();
