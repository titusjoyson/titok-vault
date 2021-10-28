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
import SettingsModel from "../../components/Settings";
import DeleteAlert from "../../components/Alert/DeleteAlert";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setSelectedNote, setMainTab } from "../../redux/actions/app";
import { setDeleteConfirmation } from "../../redux/actions/settings";
import { AllTabs } from "../../com/const";
// Other
import db from "../../models/db";

const TYPING_TIMEOUT = 1000;

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
    const { selectedNoteId } = useSelector((state) => state.app);
    const { DELETE_CONFIRMATION } = useSelector((state) => state.settings);
    const [mounted, setMounted] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [note, setNote] = useState({});
    const [deleteAlert, setDeleteAlert] = useState({});
    const [typingState, setTypingState] = useState({
        typing: false,
        typingTimeout: 0,
    });

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
        setTimeout(() => setMounted(true), 200);
    }, []);

    useEffect(() => {
        if (typeof selectedNoteId == "number" && note.id !== selectedNoteId) {
            setNoteData(selectedNoteId);
        } else if (typeof selectedNoteId == "number") {
            setNoteData(selectedNoteId);
        } else {
            setEmptyData();
        }
    }, [selectedNoteId]);

    const deleteNote = (noteId) => {
        let deleteFunction = "deleteNote";
        if (note.tags.indexOf(db.TAG_DELETED) > -1) {
            deleteFunction = "hardDeleteNote";
        }
        if (deleteFunction) {
            db[deleteFunction](noteId)
                .then((d) => {
                    setEmptyData();
                })
                .catch((e) => {
                    console.error(e);
                });
        }
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
            setNote(updatedNote);

            if (typingState.typingTimeout) {
                clearTimeout(typingState.typingTimeout);
            }

            setTypingState({
                typing: false,
                typingTimeout: setTimeout(function () {
                    db.updateNote(updatedNote.id, updatedNote);
                }, TYPING_TIMEOUT),
            });
        }
    };

    const onTabSwitch = (tab) => {
        if (AllTabs.MAIN_NAV_ITEMS.indexOf(tab) > -1) {
            dispatch(setMainTab(tab));
        } else if (AllTabs.SETTINGS === tab) {
            setSettingsOpen(true);
        }
    };

    const onDeleteAlertAction = (action) => {
        if (action === true) {
            deleteNote(note.id);
        }
        hideDeleteAlert();
    };

    const showDeleteAlert = () => {
        let deleteAlert = {
            title: "",
            content: "",
            showDontAskMe: false,
            open: false,
        };

        if (note.tags.indexOf(db.TAG_DELETED) > -1) {
            deleteAlert.title =
                "Are you sure you want to permanently delete this item?";
            deleteAlert.content = `
					This record will be deleted permanently, And
					cannot be recovered.
					`;
            deleteAlert.showDontAskMe = false;
        } else if (DELETE_CONFIRMATION === true) {
            deleteAlert.title =
                "Are you sure you want to move this note to the Trash?";
            deleteAlert.content = `
					This record will be moved to trash folder immediately, You
					can undo this actions any time from trash folder.
					`;
            deleteAlert.showDontAskMe = true;
        }
        deleteAlert.open = true;
        setDeleteAlert(deleteAlert);
    };

    const hideDeleteAlert = () => {
        setDeleteAlert({
            ...deleteAlert,
            open: false,
        });
    };

    const onDeleteClick = () => {
        if (note.tags.indexOf(db.TAG_DELETED) > -1) {
            // when deleted tag is present in nots
            showDeleteAlert();
        } else if (DELETE_CONFIRMATION === false) {
            // when global delete confirmation settings set to false
            onDeleteAlertAction(true);
        } else {
            showDeleteAlert();
        }
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <MainDrawer onSelect={(tab) => onTabSwitch(tab)} />
            <ItemList
                onSelect={(noteId) => dispatch(setSelectedNote(noteId))}
            />
            <Container className={classes.content}>
                {mounted && note.id ? (
                    <MainEditor
                        noteId={note.id}
                        title={note.title}
                        content={note.content}
                        tags={note.tags}
                        showDeleteConfirmation={DELETE_CONFIRMATION}
                        onNoteClose={() => setEmptyData()}
                        onNoteDelete={() => onDeleteClick()}
                        onNoteChange={(key, value) => mutateNote(key, value)}
                    />
                ) : mounted ? (
                    <OverviewHome onNoteAdd={(e) => addNewNote()} />
                ) : null}
            </Container>
            <SuggestionDrawer />
            <DeleteAlert
                open={deleteAlert.open}
                title={deleteAlert.title}
                content={deleteAlert.content}
                showDontAskMe={deleteAlert.showDontAskMe}
                onClose={() => hideDeleteAlert()}
                onAction={(state) => onDeleteAlertAction(state)}
                onDontAskMeChange={(state) =>
                    dispatch(setDeleteConfirmation(!DELETE_CONFIRMATION))
                }
            />
            <SettingsModel
                open={settingsOpen}
                onClose={() => setSettingsOpen(false)}
            />
        </div>
    );
}
