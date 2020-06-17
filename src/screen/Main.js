import React from "react";
import useFetch from "react-fetch-hook";
import Gallery from "react-grid-gallery";

export default function Main() {
	const { isLoading, data } = useFetch(
		`http://${process.env.REACT_APP_HOST}/${process.env.REACT_APP_API_VERSION}/trending`,
		{
			formatter: async (response) => {
				const json = await response.json();
				return json.results.map((result) => {
					return {
						src: `http://localhost:8081/img/${result.media.gif.url}/tenor.gif`,
						thumbnail: `http://localhost:8081/img/${result.media.gif.url}/tenor.gif`,
						thumbnailWidth: result.media.mp4.dims[0],
						thumbnailHeight: result.media.mp4.dims[1],
					};
				});
			},
		}
	);

	// if (isLoading) return <div>Loading</div>;
	return <div>Loading</div>;
	return (
		<>
			<div>
				<Gallery images={data} />
			</div>
		</>
	);
}

Main.whyDidYouRender = true;
