import { combineReducers } from 'redux';
import appReducer from './appReducer';
import settingsReducer from './settingsReducer';


export default combineReducers({
    "app": appReducer,
    "settings": settingsReducer,
})