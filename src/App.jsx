import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import getStore from "./redux/store";
import Routs from "./routs";
import "./App.less";

const { store, persistor } = getStore();

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Routs/>
            </PersistGate>
        </Provider>
    );
}

export default App;
