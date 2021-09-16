import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import ItemList from "../../components/ItemList";
import MainEditor from "../../components/MainEditor";
import MainDrawer from "../../components/Drawer";
import SuggestionDrawer from "../../components/SuggestionDrawer";
import OverviewHome from "../../components/OverviewHome";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	content: {
		display: "flex",
		flex: 1,
		flexDirection: "column",
	},
	formControlLabel: {
		...theme.formControlLabel,
		fontSize: 14,
	},
}));

function DeleteAlert({ open, onDialogToggle = () => null }) {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const handleClose = () => {
		onDialogToggle(false);
	};

	return (
		<Dialog
			fullScreen={fullScreen}
			open={open}
			onClose={handleClose}
			aria-labelledby="responsive-dialog-title"
		>
			<DialogTitle id="responsive-dialog-title">
				{"Are you sure you want to move this note to the Trash?"}
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					This record will be moved to trash folder immediately, You
					can undo this actions any time from trash folder.
				</DialogContentText>
				<FormGroup>
					<FormControlLabel
						control={<Checkbox size="small" />}
						label={
							<Typography className={classes.formControlLabel}>
								Don't ask me again
							</Typography>
						}
					/>
				</FormGroup>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={handleClose}>
					Disagree
				</Button>
				<Button onClick={handleClose} autoFocus>
					Agree
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default function MiniDrawer() {
	const classes = useStyles();
	const [selected, setSelected] = useState(false);
	const [open, setOpen] = React.useState(false);

	const handleDeleteAlert = (open) => {
		setOpen(open);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<MainDrawer />
			<ItemList />
			<Container className={classes.content}>
				{selected ? (
					<MainEditor
						onNoteDelete={() => setOpen(true)}
						onNoteClose={() => setSelected(false)}
					/>
				) : (
					<OverviewHome onNoteAdd={(e) => setSelected(true)} />
				)}
			</Container>
			<SuggestionDrawer />
			<DeleteAlert open={open} onDialogToggle={handleDeleteAlert} />
		</div>
	);
}
