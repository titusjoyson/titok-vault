import {
    ADD_SECRET,
    SELECT_SECRET,
    DELETE_SECRET,
    CHANGE_VIEW_MODE,
    REPLACE_SECRET,
} from "../actions/secrets";
import { ViewModes } from "../../com/const";

const initialState = {
    activeMode: ViewModes.VIEW,
    active: null,
    data: [],
};

export default (state = initialState, action) => {
    let data = [];
    switch (action.type) {
        default:
            return state;
    }
};
