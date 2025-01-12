
import React, { useState, useEffect } from "react";
import axios from "axios";
import DefaultImage from '../Images/Reg (2).jpg';

const Advisory = () => {
  const [aeos, setAeos] = useState([]); // Holds the list of AEOs
  const [filteredAeos, setFilteredAeos] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedAeo, setSelectedAeo] = useState(null); // Holds the currently selected AEO
  const [regions, setRegions] = useState([
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
    "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
    "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
    "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
    "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
  ]);

  useEffect(() => {
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
      setFilteredAeos(aeos);
    } else {
      const filtered = aeos.filter((aeo) => aeo.region === region);
      setFilteredAeos(filtered);
    }
  };

  const handleCardClick = (aeo) => {
    setSelectedAeo(aeo); // Set the selected AEO
  };

  const handleCloseProfile = () => {
    setSelectedAeo(null); // Hide the profile section
  };


  return (
    <div className="h-screen bg-gradient-to-r from-teal-800 to-green-200 flex">
      {/* Left Section */}
      <div className="flex-1 p-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAeos.length > 0 ? (
            filteredAeos.map((aeo, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded-lg shadow-lg flex flex-col items-left text-left cursor-pointer bg-white hover:bg-gray-100"
                onClick={() => handleCardClick(aeo)}
              >
                <img
                  src={aeo.profileImage || DefaultImage}
                  alt={`${aeo.firstname} ${aeo.lastname}`}
                  className="w-16 h-16 rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold">{aeo.firstname} {aeo.lastname}</h3>
                <p className="text-gray-700">Region: {aeo.region}</p>
                <p className="text-gray-700">Occupation: {aeo.occupation}</p>
              </div>
            ))
          ) : (
            <p>No Agricultural Executive Officers found in this region.</p>
          )}
        </div>
      </div>

      {/* Right Section */}
      {selectedAeo && (
        <div className="w-2/5 bg-white p-6 border-l border-gray-300">
          {/* Close Button */}
          <button
            onClick={handleCloseProfile}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            ✖
          </button>
          <img
            src={selectedAeo.profileImage || DefaultImage}
            alt={`${selectedAeo.firstname} ${selectedAeo.lastname}`}
            className="w-32 h-32 rounded-full mx-auto mb-6"
          />
          <h2 className="text-2xl font-bold text-center mb-4">
            {selectedAeo.firstname} {selectedAeo.lastname}
          </h2>
          <p className="text-gray-700 text-center mb-4">Region: {selectedAeo.region}</p>
          <p className="text-gray-700 text-center mb-4">Occupation: {selectedAeo.occupation}</p>
          <div className="text-gray-700 space-y-2">
            <p><strong>Contact Number:</strong> {selectedAeo.mobile}</p>
            <p><strong>Email:</strong> {selectedAeo.email}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Advisory;
