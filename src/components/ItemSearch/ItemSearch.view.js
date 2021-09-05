import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: "2px 4px",
		display: "flex",
		alignItems: "center",
		margin: theme.spacing(1),
        marginTop: theme.spacing(2)
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
}));

export default function ItemSearch() {
	const classes = useStyles();

	return (
		<Paper elevation={0} component="form" className={classes.root}>
			<InputBase
				className={classes.input}
				placeholder="Search Notes"
				inputProps={{ "aria-label": "Search Notes" }}
			/>
		</Paper>
	);
}