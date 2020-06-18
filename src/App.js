import { Container, CssBaseline } from "@material-ui/core";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./component/NavBar";
import { auth } from "./lib/Firebase";
import { Main, View } from "./screen";

function App() {
	useEffect(() => {
		const unsubscribe = auth().onAuthStateChanged((user) => {
			if (user) {
				console.log(`[App.js] onAuthStateChanged SIGNED IN`);
				console.log(user);
			} else {
				console.log(`[App.js] onAuthStateChanged NOT SIGNED IN`);
			}
		});
		return () => unsubscribe();
	}, []);

	return (
		<BrowserRouter>
			<NavBar />
			<Container maxWidth="md">
				<CssBaseline />
				<Switch>
					<Route exact path="/">
						<Main />
					</Route>
					<Route path="/view/:slug">
						<View />
					</Route>
				</Switch>
			</Container>
		</BrowserRouter>
	);
}

export default App;
