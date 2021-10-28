import { SET_SELECTED_NOTE, SET_ACTIVE_MAIN_TAB } from "../constants/appConst";

export function setSelectedNote(id) {
    return {
        type: SET_SELECTED_NOTE,
        payload: { id },
    };
}

export function setMainTab(tab) {
    return {
        type: SET_ACTIVE_MAIN_TAB,
        payload: { tab },
    };
}
