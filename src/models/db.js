import Dexie, { Table } from "dexie";

export class TitokDb extends Dexie {
	notes = [];

	constructor() {
		super("TitokDb");
		this.version(1).stores({
			notes: "++id, title, content, *tags, createdAt, updatedAt",
		});

		this.notes = this.table("notes");
	}

	getAllNote() {
		return this.transaction("r", this.notes, () => {
			return this.notes.orderBy('createdAt').reverse();
		});
	}

	getNote(id) {
		return db.notes.get({id});
	}

	createNote(noteObj) {
		return db.notes.add(noteObj)
	}

	updateNote(noteId, noteObj) {
		return db.notes.update(noteId, noteObj)
	}

	addNote(noteObj, callBack = () => {}) {
		this.transaction("rw", this.notes, () => {
			this.notes
				.add(noteObj)
				.catch((err) => console.error(err))
				.finally(() => callBack());
		});
	}

	deleteNote(notesId) {
		return this.notes.where({ id: notesId }).delete();
	}
}

const db = new TitokDb();

export default db;
