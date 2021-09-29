import { AllTabs } from "../../com/const";
import { SET_SELECTED_NOTE, SET_ACTIVE_MAIN_TAB } from "../constants/appConst";

const initialState = {
	selectedNoteId: null,
	activeMainTab: AllTabs.NOTES,
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SELECTED_NOTE:
			return { ...state, selectedNoteId: action.payload.id };
		case SET_ACTIVE_MAIN_TAB:
			return { ...state, activeMainTab: action.payload.tab }
		default:
			return state;
	}
};

export default appReducer;
