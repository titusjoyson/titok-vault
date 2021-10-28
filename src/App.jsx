import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from "@material-ui/core/styles";
import getStore from "./redux/store";
import Routs from "./routs";
import "./App.less";

const { store, persistor } = getStore();
let theme = createTheme({
    // overrides: {
    // 	MuiCssBaseline: {
    // 		"@global": {
    // 			"*": {
    // 				"scrollbar-width": "thin",
    // 			},
    // 			"*::-webkit-scrollbar": {
    // 				width: "4px",
    // 				height: "4px",
    // 			},
    // 		},
    // 	},
    // },
});
theme = responsiveFontSizes(theme);

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Routs />
                </PersistGate>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
