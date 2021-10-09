import React from "react";
import Overview from "../pages/overview";
import OnBoard from "../pages/onboard";

import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./privateRouter";
import PublicRoute from "./publicRouter";
import { routLeaf } from "./const";


function Routs() {
	return (
		<Router>
			<Switch>
				<PublicRoute path={routLeaf.ONBOARD} default component={OnBoard}/>
				<PrivateRoute path={routLeaf.APP} default component={Overview} />
				<Route path={routLeaf.ROOT}>
					<Redirect to={routLeaf.ONBOARD} />
				</Route>
			</Switch>
		</Router>
	);
}

export default Routs;
