import * as React from "react";
import Typography from "@material-ui/core/Typography";

export default function TermsAndCondition() {
    return (
        <>
            <Typography variant="body2" inline>
                By continuing, you agree to the
            </Typography>
            <Typography variant="body2" inline>
                <Typography
                    variant="body2"
                    gutterBottom
                    color="inherit"
                    noWrap
                    component="a"
                    target="_blank"
                    href={"#"}
                >
                    Terms and Conditions
                </Typography>{" "}
                and{" \n"}
                <Typography
                    variant="body2"
                    gutterBottom
                    color="inherit"
                    noWrap
                    component="a"
                    target="_blank"
                    href={"#"}
                >
                    Privacy Policy
                </Typography>
            </Typography>
        </>
    );
}
