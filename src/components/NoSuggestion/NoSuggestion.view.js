import { Player } from "@lottiefiles/react-lottie-player";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import lamaYoga from '../../assets/lottie/lame-yoga/75316-lama-yoga.json';

const useStyles = makeStyles((theme) => ({
	textWrapper: {
		margin: theme.spacing(4),
		textAlign: "center",
	},
	text: {
		textAlign: "center",
	},
	container: {
		display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
	},
}));

export default function NoSuggestion() {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div>
				<Player
					autoplay
					loop
					src={lamaYoga}
					style={{ height: "200px", width: "200px" }}
				/>
				<div className={classes.textWrapper}>
					<Typography
						className={classes.text}
						variant="body2"
						component="span"
						align="center"
					>
						Nothing to suggest yet, Start writing to see feedback.
					</Typography>
				</div>
			</div>
		</div>
	);
}
