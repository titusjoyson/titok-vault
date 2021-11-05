import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import GoogleButton from "react-google-button";
import logo from "../../assets/logo.png";
import TermsAndCondition from "./TAndC.view";
// redux
import { useSelector, useDispatch } from "react-redux";
import { setAccount } from "../../redux/actions/account";
// config
import config from "../../config";
import authTypes from "../../const/auth";
// style
import "./overview.styles.css";
import { useWindowSize } from "../../utils/hooks";

const useStyles = makeStyles((theme) => ({
    h4: {
        ...theme.typography.h4,
        fontWeight: "400",
        marginTop: 20,
        marginBottom: 10,
    },
    logo: {
        height: 150,
    },
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    formContainer: {
        maxHeight: "50vh",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    hide: {
        visibility: "hidden",
    },
    topContainer: {},
    bottomContainer: {
        paddingTop: 20,
    },
}));

const styles = {
    topBox: {
        flexGrow: 1,
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50%",
    },
    bottomBox: {
        minHeight: 60,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 24,
    },
};

function OnBoard() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(true);

    const dispatchAccount = (account) => {
        dispatch(setAccount(account));
    };

    const responseGoogle = (response) => {
        if (response.profileObj && response.profileObj.googleId) {
            const { email, givenName } = response.profileObj;
            const account = {
                name: givenName,
                userName: email,
                source: authTypes.GOOGLE,
            };
            console.log(account);
            dispatchAccount(account);
        }
    };

    const onLoadFinish = () => {
        setTimeout(() => setLoaded(true), 500);
    };

    const authHandler = (err, data, msal) => {
        if (!err && data) {
            console.log(msal);
        }
        if (err === null) {
            window.msal = msal;
            const { name, userName } = data.account;
            const account = {
                name,
                userName,
                source: authTypes.MICROSOFT,
                instance: msal,
            };
            console.log(account);
            dispatchAccount(account);
        }
    };

    const onLoginClick = () => {};

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={`${classes.container} onboardContainer`}>
                <div className={classes.formContainer}>
                    <div className={classes.topContainer}>
                        <div className="logoWrapper">
                            <img
                                alt="timer"
                                src={logo}
                                className={classes.logo}
                            />
                        </div>
                    </div>
                    <div
                        className={`${classes.bottomContainer} ${
                            loaded ? "" : classes.hide
                        }`}
                    >
                        <GoogleButton
                            className="ds-google-login-button"
                            onClick={onLoginClick}
                            // disabled={renderProps.disabled}
                        >
                            Continue with Google
                        </GoogleButton>
                        <div style={{ height: 20 }} />
                    </div>
                    <div
                        className={`${classes.bottomContainer} ${
                            loaded ? "" : classes.hide
                        }`}
                    >
                        <Box sx={styles.bottomBox}>
                            <TermsAndCondition />
                        </Box>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default OnBoard;
