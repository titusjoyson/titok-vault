import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import GoogleButton from "react-google-button";
import { GoogleLogin } from "../../auth/google";
import logo from "../../assets/logo.png";
import TermsAndCondition from "./TAndC.view";
// redux
import { useSelector, useDispatch } from "react-redux";
import { setAccount } from "../../redux/actions/account";
import { checkFileExists, crateFile } from "../../utils/sync";
// db
import db from "../../models/db";

import "./overview.styles.css";

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
    const [loaded, setLoaded] = useState(false);

    const responseGoogle = (response) => {
        console.log(response);
        if (response.profileObj && response.profileObj.googleId) {
            checkFileExists().then((exists) => {
                alert(exists);
            });

            db.exportLocalDb().then((blob) => {
                crateFile(blob);
                console.log(blob);
            });
            // dispatch(setAccount(response));
        } else {
        }
    };

    const onLoadFinish = () => {
        setTimeout(() => setLoaded(true), 500);
    };

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
                        <GoogleLogin
                            clientId="700482654119-f58qc1g4aokrigjnn4sjb485hv425emn.apps.googleusercontent.com"
                            buttonText="Continue with Google"
                            render={(renderProps) => (
                                <GoogleButton
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                >
                                    Continue with Google
                                </GoogleButton>
                            )}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            onAutoLoadFinished={onLoadFinish}
                            cookiePolicy={"single_host_origin"}
                            isSignedIn
                        />

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