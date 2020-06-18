import React from "react";
import useFetch from "react-fetch-hook";
import Gallery from "react-grid-gallery";
import { useHistory } from "react-router-dom";

export default function Main() {
	const history = useHistory();
	const { isLoading, data, error } = useFetch(
		`http://${process.env.REACT_APP_HOST}/${process.env.REACT_APP_API_VERSION}/trending`,
		{
			formatter: async (response) => {
				const json = await response.json();
				return json.results.map((result) => {
					return {
						src: `http://localhost:8081/img/${result.media.gif.url}/tenor.gif`,
						thumbnail: `http://localhost:8081/img/${result.media.gif.url}/tenor.gif`,
						thumbnailWidth: result.media.gif.dims[0],
						thumbnailHeight: result.media.gif.dims[1],
						slug: result.itemurl,
					};
				});
			},
		}
	);

	const onClickThumbnail = function () {
		// warning: dont change to arrow function
		const {
			props: {
				item: { slug },
			},
		} = this;

		return history.push(`/view/${slug}`);
	};

	if (isLoading) return <div>Loading</div>;
	if (error) return <div>Error!</div>;
	//return <div>Loading</div>;
	return (
		<>
			<div>
				<Gallery images={data} onClickThumbnail={onClickThumbnail} />
			</div>
		</>
	);
}

Main.whyDidYouRender = true;
