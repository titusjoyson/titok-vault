import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 125,
    },
    welcomeCardRoot: {
        marginBottom: theme.spacing(3),
    },
    card: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: theme.spacing(3),
    },
    toolBar: {
        ...theme.mixins.toolbar,
    },
}));

function AddCard({ onClick = () => null }) {
    const classes = useStyles();

    return (
        <Card className={classes.root} onClick={(e) => onClick(e)}>
            <CardActionArea className={classes.card}>
                <InsertDriveFileOutlinedIcon
                    fontSize="large"
                    color="secondary"
                />
                <CardContent>
                    <Typography gutterBottom variant="body1" component="h6">
                        Add Note
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default function OverviewHome({ onNoteAdd = () => null }) {
    const classes = useStyles();

    return (
        <>
            <div className={classes.toolBar} />
            <Card className={classes.welcomeCardRoot} elevation={0}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        ⚡ Your Secrets in your drive. ⚡
                    </Typography>
                    <br />
                    <Typography className={classes.pos} color="textSecondary">
                        We hope you're enjoying the Titok Vault. Titok Vault
                        helps you store your secrets in your drive so you dont
                        have to remember them.
                    </Typography>
                </CardContent>
            </Card>
            <AddCard onClick={onNoteAdd} />
        </>
    );
}
