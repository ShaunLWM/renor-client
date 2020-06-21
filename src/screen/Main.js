import React, { useEffect, useRef, useState } from "react";
import Gallery from "react-grid-gallery";
import { useHistory } from "react-router-dom";

export default function Main() {
	const history = useHistory();
	const currentPage = useRef(1);
	const [gifs, setGifs] = useState([]);
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

	if (gifs.length < 1) return <div>Loading</div>;
	return (
		<>
			<div>
				<Gallery
					images={gifs}
					onClickThumbnail={onClickThumbnail}
					enableImageSelection={false}
				/>
			</div>
		</>
	);
}

Main.whyDidYouRender = true;
