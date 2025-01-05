import React from 'react';
import '../StoreAssets/StoreNav.css';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className="nav-bar">
    <ul>
      
      <li><Link to="/inorganic">Exchange</Link></li>
      <li>
          <Link to="/Seller" className="sell-button">Sell product</Link>
      </li>
      <li>
          <Link to="/buy" className="buy-button">buy product</Link>
      </li>
    </ul>
  </nav>
  );
};

export default NavigationBar;