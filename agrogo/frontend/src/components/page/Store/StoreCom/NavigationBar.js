import React from 'react';
import '../StoreAssets/StoreNav.css';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className="nav-bar">
    <ul>
      
      <li><Link to="/inorganic" className="ex-button">EXCHANGE</Link></li>
      <li>
          <Link to="/Seller" className="sell-button">ADD ORDERS</Link>
      </li>
      <li>
          <Link to="/Buy" className="buy-button">FILL ORDERS</Link>
      </li>
      <li>
          <Link to="/Admin" className="admin-button">ADMIN</Link>
      </li>
      <li>
          <Link to="/#about-us" className="home-button">HOME</Link>
      </li>
    </ul>
  </nav>
  );
};

export default NavigationBar;