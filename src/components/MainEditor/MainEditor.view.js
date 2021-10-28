import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
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
    noteId,
    title,
    content,
    onNoteClose = () => null,
    onNoteDelete = () => null,
    onNoteChange = () => null,
}) {
    const classes = useStyles();
    const [editorTitle, setEditorTitle] = useState("");
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [mounted, setMounted] = useState(false);

    const setEmptyData = () => {
        setEditorTitle("");
        setEditorState(EditorState.createEmpty());
    };

    const setEditorStateFromNote = () => {
        try {
            const contentJson = JSON.parse(content);
            const contentState = convertFromRaw(contentJson);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState);
        } catch (e) {
            console.error(e);
        }
    };

    const setEditorTitleFromNote = () => {
        try {
            setEditorTitle(title);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            if (typeof noteId == "number") {
                setEditorTitleFromNote();
                setEditorStateFromNote();
            } else {
                setEmptyData();
            }
        }
    }, [noteId, mounted]);

    const onEditorTitleChange = (value) => {
        setEditorTitle(value);
        onNoteChange("title", value);
    };

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        const contentState = editorState.getCurrentContent();
        const rawValue = convertToRaw(contentState);
        const content = JSON.stringify(rawValue);
        onNoteChange("content", content);
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
                        value={editorTitle}
                        onChange={(e) => onEditorTitleChange(e.target.value)}
                        placeholder="Untitled Note"
                    />
                </FormControl>
                <div className={classes.iconRightContainer}>
                    <IconButton
                        aria-label="delete"
                        className={classes.margin}
                        onClick={(e) => onNoteDelete()}
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
                    stripPastedStyles
                    toolbar={{
                        options: [
                            "inline",
                            "fontFamily",
                            "fontSize",
                            "blockType",
                            "list",
                            "link",
                        ],
                        inline: {
                            inDropdown: false,
                            className: undefined,
                            component: undefined,
                            dropdownClassName: undefined,
                            options: ["bold", "italic", "underline"],
                        },
                        blockType: {
                            inDropdown: false,
                            options: ["H3", "H4", "Code"],
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
                        onEditorStateChange(editorState)
                    }
                />
            </div>
        </>
    );
}

export default ConvertToRawDraftContent;
