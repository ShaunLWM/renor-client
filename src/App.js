import { Container, CssBaseline } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./component/NavBar";
import Main from "./screen/Main";

function App() {
	return (
		<Router>
			<NavBar />
			<Container maxWidth="md">
				<CssBaseline />
				<Switch>
					<Route exact path="/">
						<Main />
					</Route>
				</Switch>
			</Container>
		</Router>
	);
}

export default App;
