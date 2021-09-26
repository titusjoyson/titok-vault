import React, { useEffect, useState } from "react";
import { useWindowSize } from "../../utils/hooks";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ItemSearch from "../../components/ItemSearch";
import { FixedSizeList } from "react-window";
import db from "../../models/db";

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

export default function ItemList({ onSelect = () => null }) {
	const [notes, setNotes] = useState([]);
	const size = useWindowSize();
	const classes = useStyles();

	const updateAllNotes = () => {
		db.getAllNote().then((notes) => {
			let allNotes = [];
			notes
				.each((note) => {
					allNotes.push(note);
				})
				.then(() => {
					setNotes(allNotes);
				})
				.catch((e) => {
					console.error(e);
					setNotes([]);
				});
		});
	};

	useEffect(() => {
		updateAllNotes();
		
		db.notes.hook(
			"updating",
			function (modifications, primKey, obj, transaction) {
				updateAllNotes();
			}
		);

		db.notes.hook(
			"creating",
			function (primKey, obj, transaction) {
				updateAllNotes();
			}
		);

		db.notes.hook(
			"deleting",
			function (primKey, obj, transaction) {
				updateAllNotes();
			}
		);
	}, []);

	if (!size.height) return <></>;

	const renderRow = (props) => {
		const { index, style } = props;
		const note = notes[index];

		return (
			<ListItem
				button
				style={style}
				key={index}
				onClick={() => onSelect(note.id)}
			>
				<ListItemText primary={`${note.title}`} />
			</ListItem>
		);
	};

	return (
		<div className={classes.root}>
			<ItemSearch />
			<FixedSizeList
				height={size.height - 65}
				width={250}
				itemSize={46}
				itemCount={notes.length}
			>
				{renderRow}
			</FixedSizeList>
		</div>
	);
}
