import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?countryIds=LK&minPopulation=100000&namePrefix=${inputValue}`, geoApiOptions)
            .then((response) => response.json())
            .then((response) => {
                console.log(response.data)
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`, // Value includes latitude and longitude
                            label: `${city.name}, ${city.countryCode}`, // Corrected "lable" to "label"
                        };
                    }),
                };
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
