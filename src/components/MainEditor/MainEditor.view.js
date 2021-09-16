import React, { Component, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

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
	onNoteDelete = () => null,
	onNoteClose = () => null,
}) {
	const classes = useStyles();
	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	return (
		<>
			<div className={classes.titleBar}>
				<FormControl fullWidth variant="outlined">
					<InputBase
						className={classes.titleInput}
						InputProps={{
							disableUnderline: true,
						}}
						value={null}
						onChange={() => {}}
						labelWidth={0}
						placeholder="Untitled Note"
					/>
				</FormControl>
				<div className={classes.iconRightContainer}>
					<IconButton
						aria-label="delete"
						className={classes.margin}
						onClick={(e) => onNoteDelete(e)}
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
					onEditorStateChange={setEditorState}
				/>
			</div>
		</>
	);
}

export default ConvertToRawDraftContent;
