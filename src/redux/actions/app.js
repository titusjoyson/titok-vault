import { SET_SELECTED_NOTE } from "../constants/appConst";

export function setSelectedNote(id) {
	return {
		type: SET_SELECTED_NOTE,
		payload: { id },
	};
}
