import { SET_SELECTED_NOTE } from "../constants/appConst";

const initialState = {
	selectedNoteId: null,
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SELECTED_NOTE:
			return { ...state, selectedNoteId: action.payload.id };
		default:
			return state;
	}
};

export default appReducer;
