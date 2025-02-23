import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DefaultImage from '../Images/images.png';
import DefaultLady from '../Images/lady.webp';
import Logo from '../Images/logo.png';
//import './Advisory.css';

const Advisory = () => {
  const navigate = useNavigate();
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

  const handleBackToDashboard = () => {
    navigate("/dashboard"); // Navigate to the dashboard route
  };

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
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="p-6 flex justify-between items-center text-white shadow-lg ">
        <div className="flex items-center space-x-4">
          <img src={Logo} alt="Logo" className="w-12 h-12 rounded-full shadow-lg" />
          <h1 className="text-3xl font-bold">Advisory Page</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="bg-[#388E3C] text-white py-2 px-4 rounded-lg shadow-lg hover:bg-[#66BB6A] transition duration-200"
            onClick={handleBackToDashboard}
          >
            Back to Dashboard
          </button>
          <select
            className="px-4 py-2 border border-[#9E9D24] rounded-lg text-black bg-[#F0F4C3] shadow-md hover:border-[#388E3C] transition duration-200"
            value={selectedRegion}
            onChange={handleRegionFilter}
          >
            <option value="">Select Region</option>
            {regions.map((region, index) => (
              <option key={index} value={region} className="text-black">
                {region}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Main Content Section */}
      <div className="flex-1 p-6 bg-[#E8F5E9] flex">
        {/* Left Section - AEO List */}
        <div
          className="flex-1 p-4 overflow-y-auto max-h-screen scroll-container"
          style={{ maxHeight: 'calc(100vh - 190px)', overflow: 'auto' }}
        >
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filteredAeos.length > 0 ? (
              filteredAeos.map((aeo, index) => (
                <div
                  key={index}
                  className="p-4 bg-white border border-[#2E7D32] rounded-lg shadow-lg flex flex-col items-left text-left cursor-pointer hover:bg-[#C8E6C9] transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => handleCardClick(aeo)}
                >
                  <img
                    src={aeo.profileImage || (aeo.gender === 'Male' ? DefaultImage : DefaultLady)}
                    alt={`${aeo.firstname} ${aeo.lastname}`}
                    className="w-20 h-20 rounded-full mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-[#004D40]">{aeo.firstname} {aeo.lastname}</h3>
                  <p className="text-gray-700">Gender: {aeo.gender}</p>
                  <p className="text-gray-700">Region: {aeo.region}</p>
                  <p className="text-gray-700">Occupation: {aeo.occupation}</p>
                </div>
              ))
            ) : (
              <p className="text-[#004D40]">No Agricultural Executive Officers found in this region.</p>
            )}
          </div>
        </div>

        {/* Right Section - Selected AEO Profile */}
        {selectedAeo && (
          <div
            className="w-2/6 bg-[#C8E6C9] hover:bg-green-200 p-6 border-l border-[#2E7D32] rounded-lg shadow-lg relative max-h-[calc(100vh-150px)]"
          >
            <button
              onClick={handleCloseProfile}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              ✖
            </button>
            <img
              src={selectedAeo.profileImage || (selectedAeo.gender === 'Male' ? DefaultImage : DefaultLady)}
              alt={`${selectedAeo.firstname} ${selectedAeo.lastname}`}
              className="w-28 h-28 rounded-full mx-auto mb-6 object-cover"
            />
            <h2 className="text-2xl font-bold text-[#004D40] text-center mb-4">{selectedAeo.firstname} {selectedAeo.lastname}</h2>
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
