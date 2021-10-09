import React from "react";

import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { routLeaf } from "./const";

function PublicRoute({ component: Component, ...rest }) {
    const { isAuthenticated } = useSelector((state) => state.account);
    
	return (
		<Route
			{...rest}
			render={(props) =>
				!isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: routLeaf.APP,
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
}

export default PublicRoute;