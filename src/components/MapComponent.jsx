import React, { useContext } from "react";
import { Map, Marker, NavigationControl } from "react-map-gl";
import Search from "./Search";
import DarkMode from "./DarkMode";
import { SiteContext } from "../context/SiteContext";
import { MdLocationPin } from "react-icons/md";
import { BiCurrentLocation } from "react-icons/bi";

export default function MapComponent() {
	const { viewState, setViewState, mapLink, pinLocation, userPinLocation } =
		useContext(SiteContext);

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
				<div className="z-20  absolute top-24 right-2">
					<DarkMode />
				</div>
				<NavigationControl showCompass={false} position="top-right" />
				{pinLocation?.longitude != "" && pinLocation?.latitude != "" && (
					<Marker
						longitude={pinLocation?.longitude}
						latitude={pinLocation?.latitude}
						anchor="bottom"
					>
						<MdLocationPin size={35} className={"text-red-500"} />
					</Marker>
				)}
				<Marker
					longitude={userPinLocation?.longitude}
					latitude={userPinLocation?.latitude}
					anchor="bottom"
				>
					<BiCurrentLocation size={30} className={"text-blue-400"} />
				</Marker>
			</Map>
		</div>
	);
}
