import React, { useEffect, useState } from "react";

import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { Map, NavigationControl } from "react-map-gl";
import Search from "./Search";
import axios from "axios";
import DarkMode from "./DarkMode";

export default function MapComponent() {
	const [viewState, setViewState] = React.useState({
		longitude: -100,
		latitude: 40,
		zoom: 11,
	});

	const [isDark, setIsDark] = useState(false);
	const [mapLink, setMapLink] = useState(
		"mapbox://styles/mapbox/navigation-day-v1"
	);

	useEffect(() => {
		if (isDark) {
			setMapLink("mapbox://styles/mapbox/navigation-night-v1");
		} else {
			setMapLink("mapbox://styles/mapbox/navigation-day-v1");
		}
		console.log(mapLink);
	}, [isDark]);

	const [isFound, setIsFound] = useState(true);

	const [loading, setLoading] = useState();

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setViewState({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
		});
	}, []);

	const [searchItem, setSearchItem] = useState();

	const handleSearchInput = (search) => {
		setSearchItem(search);
	};

	const handleSearch = (e) => {
		e.preventDefault();

		if (searchItem.length > 0) {
			setLoading(true);
			axios
				.get(
					`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchItem}.json?access_token=${process.env.REACT_APP_MAP_ACCESS_TOKEN}`
				)
				.then((res) => {
					console.log(res);
					if (res.data.features.length > 0) {
						setViewState({
							longitude: res.data.features[0].center[0],
							latitude: res.data.features[0].center[1],
						});
						setIsFound(true);
					} else {
						setIsFound(false);
					}

					setLoading(false);
				});
		}
	};

	return (
		<div id="container">
			<Map
				mapboxAccessToken={process.env.REACT_APP_MAP_ACCESS_TOKEN}
				{...viewState}
				onMove={(evt) => setViewState(evt.viewState)}
				style={{ width: "100vw", height: "100vh", position: "relative" }}
				mapStyle={mapLink}
			>
				<div className="w-8/12 md:w-5/12 lg:w-3/12 z-10  absolute top-2 left-2">
					<Search
						handleSearchInput={handleSearchInput}
						handleSearch={handleSearch}
						isFound={isFound}
						loading={loading}
					/>
				</div>
				<div className="z-20  absolute top-32 right-2">
					<DarkMode setIsDark={setIsDark} isDark={isDark} />
				</div>
				<NavigationControl position="top-right" />
			</Map>
		</div>
	);
}
