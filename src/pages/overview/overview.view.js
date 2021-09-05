import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import ItemList from "../../components/ItemList";
import MainEditor from "../../components/MainEditor";
import MainDrawer from "../../components/Drawer";
import SuggestionDrawer from "../../components/SuggestionDrawer";
import OverviewHome from '../../components/OverviewHome';

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	content: {
		flexGrow: 1,
		flex: 1,
		height: "100vh",
	},
}));

export default function MiniDrawer() {
	const classes = useStyles();
	const [ selected, setSelected ] = useState(false);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<MainDrawer />
			<ItemList />
			<Container>
				{selected ? <MainEditor /> : <OverviewHome/>}
			</Container>
			<SuggestionDrawer />
		</div>
	);
}
