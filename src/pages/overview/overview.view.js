import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
// MUI
import ItemList from "../../components/ItemList";
import MainEditor from "../../components/MainEditor";
import MainDrawer from "../../components/Drawer";
import SuggestionDrawer from "../../components/SuggestionDrawer";
import OverviewHome from "../../components/OverviewHome";
import db from "../../models/db";
// Redux
import { useSelector , useDispatch } from 'react-redux';
import { setSelectedNote } from '../../redux/actions/app'

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
	const dispatch = useDispatch();
	const [mounted, setMounted] = useState(false);
	const { selectedNoteId } = useSelector((state)=>state.app)
	const [note, setNote] = useState({});

	const setEmptyData = () => {
		dispatch(setSelectedNote(null));
		setNote({});
	};

	const setNoteData = (noteId) => {
		db.getNote(noteId)
			.then((note) => {
				setNote(note);
			})
			.catch((e) => {
				console.error(e);
				setEmptyData();
			});
	};

	useEffect(() => {
		setTimeout(()=>setMounted(true), 200)
	}, []);

	useEffect(() => {
		if (typeof selectedNoteId == "number" && note.id !== selectedNoteId) {
			setNoteData(selectedNoteId);
		}else if (typeof selectedNoteId == "number") {
			setNoteData(selectedNoteId);
		} else {
			setEmptyData();
		}
	}, [selectedNoteId]);

	const deleteNote = (noteId) => {
		db.deleteNote(noteId)
			.then((d) => {
				setEmptyData();
			})
			.catch((e) => {
				console.error(e);
			});
	};

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
				dispatch(setSelectedNote(noteId));
			})
			.catch((e) => {
				console.error(e);
			});
	};

	const mutateNote = (key, value) => {
		// if node id exist update note
		if (typeof note.id == "number") {
			let updatedNote = { ...note };
			updatedNote[key] = value;
			updatedNote["updatedAt"] = new Date();
			db.updateNote(updatedNote.id, updatedNote);
			setNote(updatedNote);
		}
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<MainDrawer />
			<ItemList onSelect={(noteId) => dispatch(setSelectedNote(noteId))} />
			<Container className={classes.content}>
				{mounted && note.id ? (
					<MainEditor
						noteId={note.id}
						title={note.title}
						content={note.content}
						onNoteClose={() => setEmptyData()}
						onNoteDelete={(noteId) => deleteNote(noteId)}
						onNoteChange={(key, value) => mutateNote(key, value)}
					/>
				) : (
					mounted ? <OverviewHome onNoteAdd={(e) => addNewNote()} /> : null
				)}
			</Container>
			<SuggestionDrawer />
		</div>
	);
}
