import React from 'react';
import '../StoreAssets/StoreNav.css';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  // Retrieve and parse the stored user data
  const userData = JSON.parse(localStorage.getItem("user"));  
  const userRole = userData?.role || ""; // Handle null/undefined case

  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <Link to="/inorganic" className="ex-button">EXCHANGE</Link>
        </li>
        <li>
          <Link to="/Seller" className="sell-button">ADD ORDERS</Link>
        </li>
        <li>
          <Link to="/Buy" className="buy-button">FILL ORDERS</Link>
        </li>
        <li>
          {/* Show Admin link only if the role is NOT "user" */}
          {userRole !== "user" && <Link to="/Admin" className="admin-button">ADMIN</Link>}
        </li>
        <li>
          {/* Use <a> for hash navigation */}
          <a href="/dashboard" className="home-button">HOME</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
