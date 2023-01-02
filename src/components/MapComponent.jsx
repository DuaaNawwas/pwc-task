import React, { useEffect, useRef, useState } from "react";

import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { Map, NavigationControl } from "react-map-gl";
import Search from "./Search";
import axios from "axios";
// import "mapbox-gl/dist/mapbox-gl.css";
// import Search from "./Search";
// mapboxgl.accessToken = process.env.REACT_APP_MAP_ACCESS_TOKEN;

export default function MapComponent() {
	const [viewState, setViewState] = React.useState({
		longitude: -100,
		latitude: 40,
		zoom: 11,
	});

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
		setLoading(true);
		axios
			.get(
				`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchItem}.json?access_token=${process.env.REACT_APP_MAP_ACCESS_TOKEN}`
				// { autocomplete: true }
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
	};
	// const mapContainer = useRef(null);
	// const map = useRef(null);
	// const [lng, setLng] = useState(-70.9);
	// const [lat, setLat] = useState(42.35);
	// const [zoom, setZoom] = useState(9);

	// useEffect(() => {
	// 	if (map.current) return; // initialize map only once
	// 	map.current = new mapboxgl.Map({
	// 		container: mapContainer.current,
	// 		style: "mapbox://styles/dn296/clcen58p1000615qqf0k20ht2",
	// 		center: [lng, lat],
	// 		zoom: zoom,
	// 	});

	// 	// map.addControl(new mapboxgl.NavigationControl(), "top-right");
	// }, []);

	// useEffect(() => {
	// 	if (!map.current) return; // wait for map to initialize
	// 	map.current.on("move", () => {
	// 		setLng(map.current.getCenter().lng.toFixed(4));
	// 		setLat(map.current.getCenter().lat.toFixed(4));
	// 		setZoom(map.current.getZoom().toFixed(2));
	// 	});
	// }, []);

	return (
		// <div className="relative">
		// 	<div className="w-1/3 z-10  absolute top-2 left-2">
		// 		{/* Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} */}
		// 		<Search />
		// 	</div>
		// 	<div ref={mapContainer} className="map-container h-screen" />
		// </div>
		<Map
			mapboxAccessToken={process.env.REACT_APP_MAP_ACCESS_TOKEN}
			{...viewState}
			onMove={(evt) => setViewState(evt.viewState)}
			style={{ width: "100vw", height: "100vh", position: "relative" }}
			mapStyle="mapbox://styles/dn296/clcen58p1000615qqf0k20ht2"
		>
			<div className="w-1/3 z-10  absolute top-2 left-2">
				<Search
					handleSearchInput={handleSearchInput}
					handleSearch={handleSearch}
					isFound={isFound}
					loading={loading}
				/>
			</div>
			<NavigationControl position="top-right" />
		</Map>
	);
}
