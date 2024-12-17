import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Map container style
const containerStyle = {
  width: "100%",
  height: "500px",
};

// Map center coordinates (Sri Lanka)
const center = {
  lat: 7.8731, // Latitude of Sri Lanka
  lng: 80.7718, // Longitude of Sri Lanka
};

const LeafletMapComponent = () => {
  return (
    <div style={containerStyle}>
      <MapContainer center={center} zoom={7} style={{ height: "100%", width: "100%" }}>
        {/* TileLayer - Map layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // OpenStreetMap tiles
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marker for Colombo */}
        <Marker position={[6.9271, 79.8612]}>
          <Popup>Colombo, Sri Lanka</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LeafletMapComponent;
