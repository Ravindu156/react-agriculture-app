import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";

const SearchSriLankanCities = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?namePrefix=${inputValue}&country=LK`,
        geoApiOptions
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cities.");
      }

      const data = await response.json();
      return {
        options: data.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.region}`,
        })),
      };
    } catch (error) {
      console.error("Error fetching cities:", error);
      return { options: [] };
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search Sri Lankan cities"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default SearchSriLankanCities;
