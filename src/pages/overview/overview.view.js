import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import ItemList from "../../components/ItemList";
import MainEditor from "../../components/MainEditor";
import MainDrawer from "../../components/Drawer";
import SuggestionDrawer from "../../components/SuggestionDrawer";
import OverviewHome from "../../components/OverviewHome";
import db from "../../models/db";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	content: {
		display: "flex",
		flex: 1,
		flexDirection: "column",
	},
}));

export default function MiniDrawer() {
	const classes = useStyles();
	const [selectedNoteId, setSelectedNoteId] = useState(null);

	const addNewNote = () => {
		let newNote = {
			title: "Unnamed Note",
			content: "",
			tags: [],
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		db.createNote(newNote)
			.then((noteId) => {
				setSelectedNoteId(noteId);
			})
			.catch((e) => {
				console.error(e);
			});
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<MainDrawer />
			<ItemList onSelect={(noteId) => setSelectedNoteId(noteId)} />
			<Container className={classes.content}>
				{selectedNoteId !== null ? (
					<MainEditor
						selectedNoteId={selectedNoteId}
						onNoteClose={() => setSelectedNoteId(null)}
					/>
				) : (
					<OverviewHome onNoteAdd={(e) => addNewNote()} />
				)}
			</Container>
			<SuggestionDrawer />
		</div>
	);
}
