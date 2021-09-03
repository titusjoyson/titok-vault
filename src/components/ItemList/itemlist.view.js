import React from "react";
import { useWindowSize } from "../../utils/hooks";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import { FixedSizeList } from "react-window";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: 250,
	},
	search: {
		width: 230,
		margin: theme.spacing(1),
	},
}));

function renderRow(props) {
	const { index, style } = props;

	return (
		<ListItem button style={style} key={index}>
			<ListItemText primary={`Item ${index + 1}`} />
		</ListItem>
	);
}

renderRow.propTypes = {
	index: PropTypes.number.isRequired,
	style: PropTypes.object.isRequired,
};

export default function ItemList() {
	const size = useWindowSize();
	const classes = useStyles();
	if (!size.height) return <></>;

	return (
		<div className={classes.root}>
			<TextField
				id="notes-search"
				label="Search all notes and tags"
				type="search"
				className={classes.search}
			/>
			<FixedSizeList
				height={size.height - 65}
				width={250}
				itemSize={46}
				itemCount={200}
			>
				{renderRow}
			</FixedSizeList>
		</div>
	);
}
