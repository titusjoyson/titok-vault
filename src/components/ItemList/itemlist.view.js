import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import { useSelector } from "react-redux";
import { useLiveQuery } from "dexie-react-hooks";
import { v4 as uuidv4 } from "uuid";
import ItemSearch from "../../components/ItemSearch";
import { useWindowSize } from "../../utils/hooks";
import db from "../../models/db";
import { AllTabs } from "../../com/const";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: 250,
	},
	listWrapper: {
		paddingTop: theme.spacing(0.5),
		paddingBottom: theme.spacing(1),
	},
}));

export default function ItemList({ onSelect = () => null }) {
	const [notes, setNotes] = useState([]);
	const [updateId, setUpdateId] = useState([]);
	const size = useWindowSize();
	const classes = useStyles();
	const { selectedNoteId, activeMainTab } = useSelector((state) => state.app);

	const updateAllNotes = (activeMainTab) => {
		let getNotesFunction = "getAllNotes";
		if (activeMainTab === AllTabs.TRASH) {
			getNotesFunction = "getAllDeletedNotes";
		}
		db[getNotesFunction]().then((notes) => {
			let allNotes = [];
			notes
				.each((note) => {
					allNotes.push(note);
				})
				.then(() => {
					setNotes(allNotes);
				})
				.catch((e) => {
					setNotes([]);
					console.error(e);
				});
		});
	};

	useLiveQuery(() => {
		db.notes.hook("creating", (primKey, obj, transaction) =>
			setUpdateId(uuidv4())
		);

		db.notes.hook("updating", (modifications, primKey, obj, transaction) =>
			setUpdateId(uuidv4())
		);

		db.notes.hook("deleting", (primKey, obj, transaction) =>
			setUpdateId(uuidv4())
		);
	}, []);

	useEffect(() => {
		updateAllNotes(activeMainTab);
	}, [activeMainTab, updateId]);

	if (!size.height) return <></>;

	const renderRow = (props) => {
		const { index, style } = props;
		const note = notes[index];

		return (
			<ListItem
				button
				selected={selectedNoteId === note.id}
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
			<div className={classes.listWrapper}>
				<FixedSizeList
					height={size.height - 65}
					width={250}
					itemSize={46}
					itemCount={notes.length}
				>
					{renderRow}
				</FixedSizeList>
			</div>
		</div>
	);
}
