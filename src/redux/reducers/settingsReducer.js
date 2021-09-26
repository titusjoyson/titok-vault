import { DELETE_CONFIRMATION } from "../constants/settingsConst";

const initialState = {
	DELETE_CONFIRMATION: true,
};

const settingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case DELETE_CONFIRMATION:
			return { ...state, selectedNoteId: action.payload };
		default:
			return state;
	}
};

export default settingsReducer;
