import React, { useContext, useEffect, useState } from "react";

import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { Map, NavigationControl } from "react-map-gl";
import Search from "./Search";
import axios from "axios";
import DarkMode from "./DarkMode";
import { SiteContext } from "../context/SiteContext";

export default function MapComponent() {
	const { viewState, setViewState, mapLink } = useContext(SiteContext);

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
					<Search />
				</div>
				<div className="z-20  absolute top-32 right-2">
					<DarkMode />
				</div>
				<NavigationControl position="top-right" />
			</Map>
		</div>
	);
}
