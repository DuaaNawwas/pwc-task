import { Spinner } from "flowbite-react";
import React, { useContext } from "react";
import { SiteContext } from "../context/SiteContext";

export default function Search() {
	const {
		handleSearch,
		handleSearchInput,
		isFound,
		loading,
		searchItem,
		handleAutoComplete,
		places,
		goToLocation,
	} = useContext(SiteContext);
	return (
		<form className="w-full drop-shadow-lg">
			<label
				htmlFor="default-search"
				className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
			>
				Search
			</label>
			<div className="relative">
				<input
					type="search"
					id="default-search"
					className="block w-full p-3  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Search Cities, Places..."
					required
					value={searchItem}
					onChange={(e) => handleAutoComplete(e.target.value)}
				/>
				<button
					type="submit"
					className="absolute inset-y-0 right-2 flex items-center divide-x-2"
					onClick={(e) => handleSearch(e)}
				>
					{loading ? (
						<Spinner aria-label="Default status example" />
					) : (
						<>
							<svg
								aria-hidden="true"
								className="w-5 h-5 text-gray-500 dark:text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								></path>
							</svg>
						</>
					)}
				</button>
			</div>
			{!isFound && searchItem?.length > 0 && (
				<div className="p-2 bg-gray-100 text-gray-700 text-sm rounded border border-gray-300 my-3">
					No results Found!
				</div>
			)}

			{isFound &&
				places &&
				searchItem?.length > 2 &&
				places?.map((place, i) => {
					return (
						<div
							key={i}
							onClick={() => goToLocation(place.center, place.text)}
							className="cursor-pointer p-2 bg-gray-100 text-gray-700 text-sm rounded border border-gray-300 hover:bg-gray-200"
						>
							{place.text}
							<span className="text-xs text-gray-500 block">
								{place.place_name}
							</span>
						</div>
					);
				})}
		</form>
	);
}
