import * as React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_CONFIRMATION } from "../../redux/constants/settingsConst";
import { setDeleteConfirmation } from "../../redux/actions/settings";

const useStyles = makeStyles((theme) => ({
    formControlLabel: {
        ...theme.formControlLabel,
        fontSize: 14,
    },
}));

export default function BasicModal({ open, onClose = () => null }) {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const settings = useSelector((state) => state.settings);

    const handleToggle = (value) => () => {
        switch (value) {
            case DELETE_CONFIRMATION:
                dispatch(setDeleteConfirmation(!settings.DELETE_CONFIRMATION));
                break;
            default:
                break;
        }
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={() => onClose(false)}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">Settings</DialogTitle>
            <Divider />
            <DialogContent>
                <List
                    sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                    }}
                >
                    <ListItem>
                        <ListItemText
                            id="switch-list-label-wifi"
                            primary="Show confirm on deleting from Note"
                        />
                        <Switch
                            edge="end"
                            onChange={handleToggle(DELETE_CONFIRMATION)}
                            checked={settings.DELETE_CONFIRMATION}
                            inputProps={{
                                "aria-labelledby": "switch-list-label-wifi",
                            }}
                        />
                    </ListItem>
                </List>
            </DialogContent>
        </Dialog>
    );
}
