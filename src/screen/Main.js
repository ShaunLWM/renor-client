import { Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import Gallery from "react-grid-gallery";
import { useHistory } from "react-router-dom";

export default function Main() {
	const history = useHistory();
	const currentPage = useRef(1);
	const [gifs, setGifs] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const fetchMain = async () => {
		const response = await fetch(
			`http://${process.env.REACT_APP_HOST}/${process.env.REACT_APP_API_VERSION}/trending?page=${currentPage.current}`
		);
		if (!response.ok) throw Error(response.statusText);
		const json = await response.json();
		const arr = json.results.map((result) => {
			return {
				src: `http://localhost:8081/img/${result.media.gif.url}/tenor.gif`,
				thumbnail: `http://localhost:8081/img/${result.media.gif.url}/tenor.gif`,
				thumbnailWidth: result.media.gif.dims[0],
				thumbnailHeight: result.media.gif.dims[1],
				slug: result.itemurl,
			};
		});

		setLoading(false);
		setGifs((ars) => ars.concat(arr));
	};

	useEffect(() => {
		fetchMain();
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleScroll = () => {
		if (
			window.innerHeight + document.documentElement.scrollTop !==
			document.documentElement.offsetHeight
		) {
			return;
		}

		currentPage.current += 1;
		setLoading(true);
		fetchMain();
	};

	const onClickThumbnail = function () {
		// warning: dont change to arrow function
		const {
			props: {
				item: { slug },
			},
		} = this;

		return history.push(`/view/${slug}`);
	};

	const thumbnailStyle = function () {
		console.log(this);
		return {
			width: this.props.item.vwidth,
			height: this.props.height,
			border: "1px solid #d9d9d9",
			borderRadius: "5px",
		};
	};

	if (gifs.length < 1) return <div>Loading</div>;
	return (
		<>
			<div>
				<Typography variant="h5" component="h3" gutterBottom>
					Trending Searches
				</Typography>
				<div style={{ height: "200px" }}></div>
			</div>
			<div>
				<Typography variant="h5" component="h3" gutterBottom>
					Trending GIFs
				</Typography>
				<Gallery
					images={gifs}
					onClickThumbnail={onClickThumbnail}
					enableImageSelection={false}
					margin={6}
					// thumbnailStyle={thumbnailStyle}
				/>
			</div>
		</>
	);
}

Main.whyDidYouRender = true;
