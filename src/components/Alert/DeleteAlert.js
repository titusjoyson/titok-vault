import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
	formControlLabel: {
		...theme.formControlLabel,
		fontSize: 14,
	},
}));

export default function DeleteAlert({
	title,
	content,
	showDontAskMe = true,
	open,
	onAction = () => null,
	onClose = () => null,
	onDontAskMeChange = () => null,
}) {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Dialog
			fullScreen={fullScreen}
			open={open}
			onClose={onClose}
			aria-labelledby="responsive-dialog-title"
		>
			<DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{content}</DialogContentText>
				{showDontAskMe && (
					<FormGroup>
						<FormControlLabel
							control={<Checkbox size="small" onChange={(e)=>onDontAskMeChange(e.target.checked)} />}
							label={
								<Typography
									className={classes.formControlLabel}
								>
									Don't ask me again
								</Typography>
							}
						/>
					</FormGroup>
				)}
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={() => onAction(false)}>
					Disagree
				</Button>
				<Button onClick={() => onAction(true)} autoFocus>
					Agree
				</Button>
			</DialogActions>
		</Dialog>
	);
}
