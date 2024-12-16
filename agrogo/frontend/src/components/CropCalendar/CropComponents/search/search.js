import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?countryIds=LK&type=ALL&minPopulation=100000&namePrefix=${inputValue}`, geoApiOptions)
            .then((response) => response.json())
            .then((response) => {
                if (response.data && Array.isArray(response.data)) {
                    return {
                        options: response.data.map((location) => ({
                            value: `${location.latitude} ${location.longitude}`, // Latitude and longitude as value
                            label: `${location.name}, ${location.countryCode}`, // Name and country code as label
                        })),
                    };
                }
                return { options: [] }; 
            }) 
            .catch((err) => {
                console.error("Error fetching options:", err);
                return { options: [] }; // Return empty options on error
            });
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData); // Update the state with the selected city
        onSearchChange(searchData); // Notify parent component of the change
    };

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600} // Add debounce to limit API calls
            value={search} // Current search value
            onChange={handleOnChange} // Handle selection change
            loadOptions={loadOptions} // Load options dynamically
        />
    );
};

export default Search;
