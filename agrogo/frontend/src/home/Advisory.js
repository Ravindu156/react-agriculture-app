import React, { useState, useEffect } from "react";
import axios from "axios";

const Advisory = () => {
  const [aeos, setAeos] = useState([]); // Holds the list of AEOs
  const [filteredAeos, setFilteredAeos] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [regions, setRegions] = useState([
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", 
    "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", 
    "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", 
    "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", 
    "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
  ]);

  useEffect(() => {
    // Fetch the list of Agricultural Executive Officers (AEOs) from the server
    const fetchAeos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/aeos");
        setAeos(response.data);
        setFilteredAeos(response.data); // Initially show all AEOs
      } catch (error) {
        console.error("Error fetching AEOs:", error);
      }
    };

    fetchAeos();
  }, []);

  const handleRegionFilter = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);

    if (region === "") {
      // If no region selected, show all AEOs
      setFilteredAeos(aeos);
    } else {
      // Filter AEOs by the selected region
      const filtered = aeos.filter((aeo) => aeo.region === region);
      setFilteredAeos(filtered);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Advisory Page</h1>

      <div className="mb-4">
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg"
          value={selectedRegion}
          onChange={handleRegionFilter}
        >
          <option value="">Select Region</option>
          {regions.map((region, index) => (
            <option key={index} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full max-w-md space-y-4">
        {filteredAeos.length > 0 ? (
          filteredAeos.map((aeo, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">{aeo.firstname} {aeo.lastname}</h3>
              <p className="text-gray-700">Username: {aeo.username}</p>
              <p className="text-gray-700">Email: {aeo.email}</p>
              <p className="text-gray-700">Region: {aeo.region}</p>
              <p className="text-gray-700">Experience: {aeo.experience}</p>
            </div>
          ))
        ) : (
          <p>No Agricultural Executive Officers found in this region.</p>
        )}
      </div>
    </div>
  );
};

export default Advisory;
