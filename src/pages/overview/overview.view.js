import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
import ItemList from "../../components/ItemList";
import MainEditor from "../../components/MainEditor";
import MainDrawer from "../../components/Drawer";
import SuggestionDrawer from "../../components/SuggestionDrawer";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	titleBar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	titleInput: {
		height: 30,
	},
	content: {
		flexGrow: 1,
		flex: 1,
		height: "100vh",
	},
}));

export default function MiniDrawer() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleDrawer = () => {
		setOpen(!open);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<MainDrawer />
			<ItemList />
			<Container>
				<div className={classes.titleBar}>
					<FormControl fullWidth variant="outlined">
						<InputBase
							className={classes.titleInput}
							InputProps={{
								disableUnderline: true,
							}}
							value={null}
							onChange={() => {}}
							labelWidth={0}
							placeholder="Untitled Note"
						/>
					</FormControl>
				</div>
				<MainEditor />
			</Container>
			<SuggestionDrawer />
		</div>
	);
}
