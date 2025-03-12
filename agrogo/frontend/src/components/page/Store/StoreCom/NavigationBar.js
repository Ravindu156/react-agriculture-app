import React from 'react';
import '../StoreAssets/StoreNav.css';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className="nav-bar">
    <ul>
      
      <li><Link to="/inorganic" className="ex-button">Exchange</Link></li>
      <li>
          <Link to="/Seller" className="sell-button">Sell product</Link>
      </li>
      <li>
          <Link to="/Buy" className="buy-button">Buy product</Link>
      </li>
      <li>
          <Link to="/Admin" className="admin-button">Admin</Link>
      </li>
    </ul>
  </nav>
  );
};

export default NavigationBar;