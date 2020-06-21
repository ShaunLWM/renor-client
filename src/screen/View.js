import { Grid, TextField, Tooltip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
	ChatBubble as ChatBubbleIcon,
	Code as CodeIcon,
	Facebook as FacebookIcon,
	Flag as FlagIcon,
	Link as LinkIcon,
	Pinterest as PinterestIcon,
	Reddit as RedditIcon,
	Twitter as TwitterIcon,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useClipboard } from "use-clipboard-copy";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 20,
	},
	gif: {
		width: "100%",
		borderRadius: "5px",
	},
	tagsDiv: {
		margin: "20px 0px 30px 0px",
	},
	tag: {
		cursor: "pointer",
		display: "inline-block",
		textTransform: "uppercase",
		fontWeight: 600,
		color: "#fff",
		padding: "10px 20px",
		borderRadius: "5px",
		fontSize: "14px",
		boxShadow: "0 1px 3px 0 rgba(0,0,0,.08), 0 4px 6px 0 rgba(83,83,92,.11)",
		marginRight: "20px",
		marginBottom: "10px",
	},
	shareDiv: {
		marginBottom: "20px",
	},
	shareInput: {
		cursor: "pointer",
		width: "100%",
	},
	smDiv: {
		display: "flex",
		margin: "20px 0px",
	},
	smIcon: {
		cursor: "pointer",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "pink",
		width: "40px",
		height: "40px",
		marginRight: "20px",
		marginTop: "5px",
		marginBottom: "5px",
		borderRadius: "50%",
		boxShadow: "0 1px 10px 0 rgba(0,0,0,.1), 0 2px 4px 0 rgba(50,50,93,.1)",
	},
	customHr: {
		borderTop: "1px solid #e8e8e8",
	},
	relatedDiv: {
		display: "flex",
		flexDirection: "column",
	},
	gifWithOverlay: {
		"&:hover $gifOverlay": {
			cursor: "pointer",
			opacity: 1,
		},
	},
	gifOverlay: {
		position: "absolute",
		borderRadius: "5px",
		top: 0,
		bottom: 25,
		left: 0,
		right: 0,
		backgroundImage:
			"linear-gradient(-180deg,transparent 50%,rgba(0,0,0,.25) 99%)",
		opacity: 0,
		zIndex: 1,
		transition: ".3s ease",
	},
	overlayTextDiv: {
		padding: 6,
		position: "absolute",
		bottom: 0,
		color: "white",
		fontWeight: 500,
		display: "flex",
	},
}));

export default function View({ gif = null }) {
	const clipboard = useClipboard();
	const classes = useStyles();
	const { slug } = useParams();
	const [gifInfo, setGifInfo] = useState(null);
	const [related, setRelated] = useState([]);
	const [sm] = useState([
		{
			icon: <ChatBubbleIcon style={{ color: "#fdfdfd" }} fontSize="small" />,
			tooltip: "iMessage",
			color: "#4cd964",
		},
		{
			icon: <FacebookIcon style={{ color: "#fdfdfd" }} fontSize="small" />,
			tooltip: "Facebook",
			color: "#3b5998",
		},
		{
			icon: <TwitterIcon style={{ color: "#fdfdfd" }} fontSize="small" />,
			tooltip: "Twitter",
			color: "#1da1f2",
		},
		{
			icon: <RedditIcon style={{ color: "#fdfdfd" }} fontSize="small" />,
			tooltip: "Reddit",
			color: "#ff4500",
		},
		{
			icon: <PinterestIcon style={{ color: "#fdfdfd" }} fontSize="small" />,
			tooltip: "Pinterest",
			color: "#ad2530",
		},
		{
			icon: <ChatBubbleIcon style={{ color: "#fdfdfd" }} fontSize="small" />,
			tooltip: "Tumblr",
			color: "#303d4d",
		},
		{
			icon: <LinkIcon style={{ color: "#020202" }} fontSize="small" />,
			custom: "Copy link to clipboard",
			color: "#fdfdfd",
			fn: (gifInfo) => {
				clipboard.copy(
					`http://localhost:8081/img/${gifInfo.media.gif.url}/tenor.gif`
				);
			},
		},
		{
			icon: <CodeIcon style={{ color: "#020202" }} fontSize="small" />,
			custom: "Copy embed to clipboard",
			color: "#fdfdfd",
			fn: (gifInfo) =>
				clipboard.copy(
					`<div class="tenor-gif-embed" data-postid="5305081" data-share-method="host" data-width="100%" data-aspect-ratio="1.2666666666666666"><a href="https://tenor.com/view/cat-eyes-staring-gif-5305081">${gifInfo.title}</a> from <a href="https://tenor.com/search/cat-gifs">Cat GIFs</a></div><script type="text/javascript" async src="https://tenor.com/embed.js"></script>`
				),
		},
		{
			icon: <FlagIcon style={{ color: "#020202" }} fontSize="small" />,
			custom: "Report",
			color: "#fdfdfd",
		},
	]);

	useEffect(() => {
		async function fetchGif() {
			const res = await fetch(
				`http://${process.env.REACT_APP_HOST}/${process.env.REACT_APP_API_VERSION}/?slug=${slug}&full=1&related=1`
			);

			const data = await res.json();
			console.log(data.results[0]);
			setGifInfo(data.results[0]);
			setRelated(
				data.related.map((r) => {
					return {
						url: r.media.gif.url,
						tags: r.tags,
					};
				})
			);
		}

		if (!gif) fetchGif();
	}, []);

	if (!gifInfo) return <div>Loading</div>;
	return (
		<Grid container className={classes.root} spacing={2}>
			<Grid item sm={12} md={8}>
				<Typography variant="h5" component="h3" gutterBottom>
					{gifInfo.title}
				</Typography>
				<img
					className={classes.gif}
					src={`http://localhost:8081/img/${gifInfo.media.gif.url}/tenor.gif`}
					alt={gifInfo.title}
				/>
				<div className={classes.controlDiv}>Hi</div>
				<div className={classes.customHr} />
				<div className={classes.smDiv}>
					{sm.map((s, i) => {
						let share = `Share to ${s.tooltip}`;
						if (!s.tooltip) share = s.custom;
						return (
							<Tooltip title={share} aria-label={share} placement="top" key={i}>
								<div
									className={classes.smIcon}
									style={{ backgroundColor: s.color }}
									onClick={() => s.fn && s.fn(gifInfo)}>
									{s.icon}
								</div>
							</Tooltip>
						);
					})}
				</div>
				<div className={classes.customHr} />
				<div className={classes.tagsDiv}>
					{gifInfo.tags.map((tag) => (
						<Typography
							className={classes.tag}
							style={{ backgroundColor: tag.color }}
							key={tag.text}
							variant="subtitle1"
							gutterBottom>
							{tag.text}
						</Typography>
					))}
				</div>
				<div className={classes.shareDiv}>
					<Typography variant="body1" gutterBottom>
						Share URL
					</Typography>
					<TextField
						onClick={() =>
							clipboard.copy(
								`http://localhost:8081/img/${gifInfo.media.gif.url}/tenor.gif`
							)
						}
						className={classes.shareInput}
						id="input-share-url"
						variant="outlined"
						value={`http://localhost:8081/img/${gifInfo.media.gif.url}/tenor.gif`}
						readOnly
					/>
					<Typography
						variant="body1"
						gutterBottom
						style={{ marginTop: "20px" }}>
						Embed
					</Typography>
					<TextField
						onClick={() =>
							clipboard.copy(
								`<div class="tenor-gif-embed" data-postid="5305081" data-share-method="host" data-width="100%" data-aspect-ratio="1.2666666666666666"><a href="https://tenor.com/view/cat-eyes-staring-gif-5305081">${gifInfo.title}</a> from <a href="https://tenor.com/search/cat-gifs">Cat GIFs</a></div><script type="text/javascript" async src="https://tenor.com/embed.js"></script>`
							)
						}
						className={classes.shareInput}
						id="input-embed-url"
						variant="outlined"
						value={`<div class="tenor-gif-embed" data-postid="5305081" data-share-method="host" data-width="100%" data-aspect-ratio="1.2666666666666666"><a href="https://tenor.com/view/cat-eyes-staring-gif-5305081">${gifInfo.title}</a> from <a href="https://tenor.com/search/cat-gifs">Cat GIFs</a></div><script type="text/javascript" async src="https://tenor.com/embed.js"></script>`}
						readOnly
					/>
				</div>
				<div className={classes.customHr} />
				<Typography variant="body1" gutterBottom style={{ marginTop: "20px" }}>
					Details
				</Typography>
			</Grid>
			<Grid item sm={12} md={4}>
				<Typography variant="h6" gutterBottom>
					Related GIFs
				</Typography>
				<div className={classes.relatedDiv}>
					{related.length > 0 &&
						related.map((r) => {
							return (
								<div
									className={classes.gifWithOverlay}
									style={{ position: "relative" }}>
									<div className={classes.gifOverlay}>
										<div className={classes.overlayTextDiv}>
											{r.tags.map((tag) => (
												<span>#{tag}</span>
											))}
										</div>
									</div>
									<img
										className={classes.gif}
										style={{ marginBottom: "20px", cursor: "pointer" }}
										src={`http://localhost:8081/img/${r.url}/tenor.gif`}
										alt={gifInfo.title}
									/>
								</div>
							);
						})}
				</div>
			</Grid>
		</Grid>
	);
}
