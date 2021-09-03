import React from "react";
import Overview from "../pages/overview";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

function Routs() {
	return (
		<Router>
			<Switch>
				<Route path="/" default component={Overview} />
			</Switch>
		</Router>
	);
}

export default Routs;
