import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";

const persistConfig = {
	key: "root",
	storage,
	blacklist: ['account'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = () => {
	const store = createStore(persistedReducer, applyMiddleware(thunk));
	const persistor = persistStore(store);
	return { store, persistor };
};

export default store;
