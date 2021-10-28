import Dexie from "dexie";
import {
    importDB,
    exportDB,
    importInto,
    peakImportFile,
} from "dexie-export-import";

export class TitokDb extends Dexie {
    TAG_DELETED = "DELETED";
    notes = [];

    constructor() {
        super("TitokDb");
        this.init();
    }

    init() {
        this.version(1).stores({
            notes: "++id, title, content, *tags, createdAt, updatedAt",
        });

        this.notes = this.table("notes");
    }

    getAllNotes() {
        return this.transaction("r", this.notes, () => {
            return this.notes
                .orderBy("createdAt")
                .filter((note) => note.tags.indexOf(this.TAG_DELETED) === -1)
                .reverse();
        });
    }

    getAllDeletedNotes() {
        return this.transaction("r", this.notes, () => {
            return this.notes
                .orderBy("createdAt")
                .filter((note) => note.tags.indexOf(this.TAG_DELETED) > -1)
                .reverse();
        });
    }

    getNote(id) {
        return db.notes.get({ id });
    }

    createNote(noteObj) {
        return db.notes.add(noteObj);
    }

    updateNote(noteId, noteObj) {
        return db.notes.update(noteId, noteObj);
    }

    addNote(noteObj, callBack = () => {}) {
        return this.transaction("rw", this.notes, () => {
            this.notes
                .add(noteObj)
                .catch((err) => console.error(err))
                .finally(() => callBack());
        });
    }

    deleteNote(noteId) {
        return db
            .getNote(noteId)
            .then((note) => {
                let newNote = { ...note };
                if (note.tags.indexOf(this.TAG_DELETED) === -1) {
                    newNote.tags.push(this.TAG_DELETED);
                    return this.updateNote(noteId, newNote);
                } else {
                    return 0;
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }

    hardDeleteNote(noteId) {
        return this.notes
            .where({ id: noteId, tags: this.TAG_DELETED })
            .delete();
    }

    exportLocalDb() {
        return exportDB(db);
    }
}

const db = new TitokDb();

export default db;
