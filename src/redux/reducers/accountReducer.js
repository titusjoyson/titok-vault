import { SET_ACCOUNT, RESET_ACCOUNT } from "../constants/accountConst";

const initialState = {
	user: {},
	isAuthenticated: false,
};

const accountReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ACCOUNT:
			// alert(JSON.stringify(action.payload.accessToken ? true : false))
			return {
				...state,
				user: action.payload,
				isAuthenticated: action.payload.accessToken ? true : false,
			};
		case RESET_ACCOUNT:
			return { ...state, user: {}, isAuthenticated: false };
		default:
			return state;
	}
};

export default accountReducer;
