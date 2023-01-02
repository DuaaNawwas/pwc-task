import { Spinner } from "flowbite-react";
import React from "react";

export default function Search({
	handleSearch,
	handleSearchInput,
	isFound,
	loading,
}) {
	return (
		<form className="w-full">
			<label
				for="default-search"
				class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
			>
				Search
			</label>
			<div class="relative">
				{/* <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						aria-hidden="true"
						class="w-5 h-5 text-gray-500 dark:text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
				</div> */}
				<input
					type="search"
					id="default-search"
					class="block w-full p-3  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Search Cities, Places..."
					required
					onChange={(e) => handleSearchInput(e.target.value)}
				/>
				<button
					type="submit"
					class="absolute inset-y-0 right-9 flex items-center divide-x-2"
					onClick={(e) => handleSearch(e)}
				>
					{loading ? (
						<Spinner aria-label="Default status example" />
					) : (
						<>
							<svg
								aria-hidden="true"
								class="w-5 h-5 text-gray-500 dark:text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								></path>
							</svg>
						</>
					)}
				</button>
			</div>
			{!isFound && (
				<div class="p-2 bg-gray-100 text-gray-700 text-sm rounded border border-gray-300 my-3">
					No results Found!
				</div>
			)}
		</form>
	);
}
