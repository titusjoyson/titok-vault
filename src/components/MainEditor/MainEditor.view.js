import React, { Component, useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import {
	EditorState,
	ContentState,
	convertToRaw,
	convertFromRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import db from "../../models/db";
import DeleteAlert from "../../components/Alert/DeleteAlert";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./MainEditor.style.css";

const useStyles = makeStyles((theme) => ({
	titleBar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	iconLeftContainer: {
		display: "flex",
		paddingRight: "20px",
	},
	iconRightContainer: {
		display: "flex",
		paddingLeft: "20px",
	},
	titleInput: {
		height: 30,
	},
}));

function ConvertToRawDraftContent({
	selectedNoteId,
	onNoteClose = () => null,
}) {
	const classes = useStyles();
	const [note, setNote] = useState({});
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [deleteAlert, setDeleteAlert] = useState(false);

	const setEmptyData = () => {
		setNote({});
		setEditorState(EditorState.createEmpty());
	};

	const setNoteData = (noteId) => {
		db.getNote(noteId)
			.then((note) => {
				setNote(note);
				try {
					const contentJson = JSON.parse(note.content);
					const contentState = convertFromRaw(contentJson);
					const editorState =
						EditorState.createWithContent(contentState);
					setEditorState(editorState);
				} catch (e) {
					console.error(e);
				}
			})
			.catch((e) => {
				console.error(e);
				setEmptyData();
			});
	};

	useEffect(() => {
		if (typeof selectedNoteId == "number" && note.id !== selectedNoteId) {
			setNoteData(selectedNoteId);
		} else {
			setEmptyData();
		}
	}, [selectedNoteId]);

	const deleteNote = (noteId) => {
		db.deleteNote(noteId)
			.then((d) => {
				setEmptyData();
				onNoteClose();
			})
			.catch((e) => {
				console.error(e);
			});
	};

	const onNoteDelete = (action) => {
		if (action === true) {
			deleteNote(note.id);
			setDeleteAlert(true);
		} else {
			setDeleteAlert(false);
		}
	};

	const mutateNote = (key, value) => {
		// if node id exist update note
		if (typeof note.id == "number") {
			let updatedNote = { ...note };
			updatedNote[key] = value;
			updatedNote["updatedAt"] = new Date();
			db.updateNote(updatedNote.id, updatedNote);
			setNote(updatedNote);
			// if node id does exist create note
		}
	};

	const onEditorStateChange = (key, editorState) => {
		var contentState = editorState.getCurrentContent();
		const rawValue = convertToRaw(contentState);
		const content = JSON.stringify(rawValue);
		mutateNote(key, content);
		setEditorState(editorState);
	};

	return (
		<>
			<div className={classes.titleBar}>
				<FormControl fullWidth variant="outlined">
					<InputBase
						className={classes.titleInput}
						InputProps={{
							disableUnderline: true,
						}}
						value={note.title}
						onChange={(e) => mutateNote("title", e.target.value)}
						placeholder="Untitled Note"
					/>
				</FormControl>
				<div className={classes.iconRightContainer}>
					<IconButton
						aria-label="delete"
						className={classes.margin}
						onClick={(e) => setDeleteAlert(true)}
					>
						<DeleteIcon fontSize="small" />
					</IconButton>
					<IconButton
						aria-label="close"
						className={classes.margin}
						onClick={(e) => onNoteClose(e)}
					>
						<CloseIcon fontSize="small" />
					</IconButton>
				</div>
			</div>
			<div className="editor-root">
				<Editor
					initialEditorState={editorState}
					editorState={editorState}
					toolbar={{
						options: ["inline", "blockType", "list", "link"],
						inline: {
							inDropdown: false,
							className: undefined,
							component: undefined,
							dropdownClassName: undefined,
							options: ["bold", "italic", "underline"],
						},
						blockType: {
							inDropdown: false,
							options: ["H1", "H2", "Code"],
							className: undefined,
							component: undefined,
							dropdownClassName: undefined,
							title: undefined,
						},
						list: {
							inDropdown: false,
							className: undefined,
							component: undefined,
							dropdownClassName: undefined,
							options: ["unordered", "ordered"],
							title: undefined,
						},
						link: {
							inDropdown: false,
							className: undefined,
							component: undefined,
							popupClassName: undefined,
							dropdownClassName: undefined,
							showOpenOptionOnHover: true,
							defaultTargetOption: "_self",
							options: ["link", "unlink"],
							linkCallback: undefined,
						},
					}}
					toolbarClassName="editor-toolbar"
					wrapperClassName="editor-wrapper"
					editorClassName="editor-editor"
					placeholder="Type or paste your text here!"
					onEditorStateChange={(editorState) =>
						onEditorStateChange("content", editorState)
					}
				/>
			</div>
			<DeleteAlert
				open={deleteAlert}
				onClose={() => setDeleteAlert(false)}
				onAction={(state) => onNoteDelete(state)}
			/>
		</>
	);
}

export default ConvertToRawDraftContent;
