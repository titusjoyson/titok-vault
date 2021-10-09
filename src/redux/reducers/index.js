import { combineReducers } from 'redux';
import appReducer from './appReducer';
import settingsReducer from './settingsReducer';
import accountReducer from "./accountReducer";


export default combineReducers({
    "app": appReducer,
    "settings": settingsReducer,
    "account": accountReducer,
})