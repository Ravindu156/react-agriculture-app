
import React, { useState, useEffect } from "react";
import axios from "axios";
import DefaultImage from '../Images/images.png';
import DefaultLady from '../Images/lady.webp';
import Logo from '../Images/logo.png';
import './Advisory.css'

const Advisory = () => {
  const [aeos, setAeos] = useState([]); 
  const [filteredAeos, setFilteredAeos] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedAeo, setSelectedAeo] = useState(null); 
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
        setFilteredAeos(response.data); 
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
    setSelectedAeo(aeo); 
  };

  const handleCloseProfile = () => {
    setSelectedAeo(null); 
  };

  // Enable scrolling with Enter key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        const scrollContainer = document.querySelector(".scroll-container");
        if (scrollContainer) {
          scrollContainer.scrollBy({
            top: 100, // Adjust scroll amount
            behavior: "smooth",
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-800 to-green-200 flex flex-col">
      {/* Header Section */}
      <header className="bg-teal-700 p-6 flex justify-between items-center text-white">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-12 h-12 mr-4" />
          <h1 className="text-3xl font-bold">Advisory Page</h1>
        </div>
        <div className="flex items-center">
          <button className="bg-gray-700 text-white py-2 px-4 rounded-lg mr-4">
            Back to Dashboard
          </button>
          <select
            className="px-6 py-2 border border-gray-300 rounded-lg"
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
      </header>

      {/* Main Content Section */}
      <div className="flex-1 p-6 flex">
        {/* Left Section - AEO List */}
        <div
          className="flex-1 p-4 overflow-y-auto max-h-screen scroll-container"
          style={{
            maxHeight: 'calc(100vh - 150px)',
            overflow: 'auto',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAeos.length > 0 ? (
              filteredAeos.map((aeo, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-300 rounded-lg shadow-lg flex flex-col items-left text-left cursor-pointer bg-white hover:bg-gray-100"
                  onClick={() => handleCardClick(aeo)}
                >
                  <img
                    src={aeo.profileImage || (aeo.gender === 'Male' ? DefaultImage : DefaultLady)}
                    alt={`${aeo.firstname} ${aeo.lastname}`}
                    className="w-20 h-20 rounded-full mb-4"
                  />
                  <h3 className="text-xl font-semibold">{aeo.firstname} {aeo.lastname}</h3>
                  <p className="text-gray-700">Gender: {aeo.gender}</p>
                  <p className="text-gray-700">Region: {aeo.region}</p>
                  <p className="text-gray-700">Occupation: {aeo.occupation}</p>
                </div>
              ))
            ) : (
              <p>No Agricultural Executive Officers found in this region.</p>
            )}
          </div>
        </div>

        {/* Right Section - Selected AEO Profile */}
        {selectedAeo && (
          <div
            className="w-2/6 bg-white p-6 border-l border-gray-300 relative"
            style={{ maxHeight: 'calc(100vh - 150px)' }}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseProfile}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              ✖
            </button>
            <img
              src={selectedAeo.profileImage || (selectedAeo.gender === 'Male' ? DefaultImage : DefaultLady)}
              alt={`${selectedAeo.firstname} ${selectedAeo.lastname}`}
              className="w-28 h-28 rounded-full mx-auto mb-6"
            />
            <h2 className="text-2xl font-bold text-center mb-4">
              {selectedAeo.firstname} {selectedAeo.lastname}
            </h2>
            <p className="text-gray-700 text-center mb-4">Region: {selectedAeo.region}</p>
            <p className="text-gray-700 text-center mb-4">Occupation: {selectedAeo.occupation}</p>
            <div className="text-gray-700 space-y-2">
              <p><strong>Contact Number:</strong> {selectedAeo.mobile}</p>
              <p><strong>Email:</strong> {selectedAeo.email}</p>
              <p><strong>Gender:</strong> {selectedAeo.gender}</p>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Advisory;
