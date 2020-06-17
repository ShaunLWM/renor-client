import { Container, CssBaseline } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./component/NavBar";
import Main from "./screen/Main";

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Container maxWidth="md">
				<CssBaseline />
				<Switch>
					<Route exact path="/">
						<Main />
					</Route>
				</Switch>
			</Container>
		</BrowserRouter>
	);
}

export default App;
