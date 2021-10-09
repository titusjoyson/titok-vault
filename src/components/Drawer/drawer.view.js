import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import NotesIcon from "@material-ui/icons/Notes";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { resetAccount } from "../../redux/actions/account";
import { AllTabs } from "../../com/const";

const drawerWidth = 240;
const iconMap = {
	Notes: NotesIcon,
	Trash: DeleteIcon,
	Settings: SettingsIcon,
	About: InfoOutlined,
	Help: HelpOutlineIcon,
};

const useStyles = makeStyles((theme) => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap",
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: "hidden",
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		flex: 1,
		height: "100vh",
	},
	avatar: {
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
	flexUp: {
		display: "flex",
		flex: 1,
	},
}));

function AccouontItem({ user }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const onLogout = () => {
		dispatch(resetAccount());
		handleClose();
	};

	const getNameLetter = () => {
		try {
			return user.profileObj.name[0];
		} catch (e) {
			return "";
		}
	};

	return (
		<ListItemIcon>
			<Avatar className={classes.avatar} onClick={handleClick}>
				{getNameLetter()}
			</Avatar>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				anchorOrigin="right"
			>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem
					onClick={() => {
						if (window.gapi) {
							const auth2 = window.gapi.auth2.getAuthInstance();
							if (auth2 != null) {
								auth2
									.signOut()
									.then(
										auth2
											.disconnect()
											.then((e)=>{
												onLogout()
											})
											.catch(e=>{
												console.log(e)
											})
									);
							}
						}
					}}
				>
					Logout
				</MenuItem>
			</Menu>
		</ListItemIcon>
	);
}

export default function MainDrawer({ onSelect = () => null }) {
	const classes = useStyles();
	const { user } = useSelector((state) => state.account);
	const [open, setOpen] = React.useState(false);

	const handleDrawer = () => {
		setOpen(!open);
	};

	return (
		<Drawer
			variant="permanent"
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: open,
				[classes.drawerClose]: !open,
			})}
			classes={{
				paper: clsx({
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				}),
			}}
		>
			<div className={classes.toolbar}>
				<IconButton onClick={handleDrawer}>
					{!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
			</div>
			<Divider />
			<List>
				{[AllTabs.NOTES, AllTabs.TRASH, AllTabs.SETTINGS].map(
					(text, index) => {
						const Icon = iconMap[text];

						return (
							<ListItem
								button
								key={text}
								onClick={() => onSelect(text)}
							>
								<ListItemIcon>
									<Icon />
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						);
					}
				)}
			</List>
			<Divider />
			<List>
				{[AllTabs.ABOUT, AllTabs.HELP].map((text, index) => {
					const Icon = iconMap[text];

					return (
						<ListItem button disabled key={text}>
							<ListItemIcon>
								<Icon />
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					);
				})}
			</List>
			<div className={classes.flexUp} />
			<Divider />
			<List>
				<ListItem button key={"Account"}>
					<AccouontItem user={user} />
					<ListItemText primary={"Account"} />
				</ListItem>
			</List>
		</Drawer>
	);
}
