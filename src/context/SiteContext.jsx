import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const SiteContext = createContext();

export default function SiteProvider({ children }) {
	// Map coordinates state
	const [viewState, setViewState] = useState({
		longitude: -100,
		latitude: 40,
		zoom: 11,
	});

	// Get user's current location
	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setViewState({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
		});
	}, []);

	// ---------------------------------------
	// Search
	// ---------------------------------------

	// state to handle if there is results from search
	const [isFound, setIsFound] = useState(true);
	// state to handle loading
	const [loading, setLoading] = useState();
	// state for search input
	const [searchItem, setSearchItem] = useState();
	// function to set search input
	const handleSearchInput = (search) => {
		setSearchItem(search);
	};
	// function to get searched location from api
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

	// ---------------------------------------
	// Theme
	// ---------------------------------------

	// States for switching map style based on site's theme
	const [isDark, setIsDark] = useState(false);
	const [mapLink, setMapLink] = useState(
		"mapbox://styles/mapbox/navigation-day-v1"
	);
	// Change mapstyle link based on theme
	useEffect(() => {
		if (isDark) {
			setMapLink("mapbox://styles/mapbox/navigation-night-v1");
		} else {
			setMapLink("mapbox://styles/mapbox/navigation-day-v1");
		}
		console.log(mapLink);
	}, [isDark]);

	return (
		<SiteContext.Provider
			value={{
				viewState,
				setViewState,
				isFound,
				setIsFound,
				loading,
				setLoading,
				searchItem,
				setSearchItem,
				handleSearchInput,
				handleSearch,
				isDark,
				setIsDark,
				mapLink,
			}}
		>
			{children}
		</SiteContext.Provider>
	);
}
