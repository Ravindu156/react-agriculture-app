import React from 'react';
import '../StoreAssets/StoreNav.css';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className="nav-bar">
    <ul>
      <li><Link to="/fertilizers">Fertilizers</Link></li>
      <li><Link to="/farming-tools">Farming Tools</Link></li>
      <li><Link to="/organic-products">Organic Products</Link></li>
      <li><Link to="/inorganic-products">Inorganic Products</Link></li>
      <li>
          <Link to="/Seller" className="sell-button">Sell</Link>
      </li>
    </ul>
  </nav>
  );
};

export default NavigationBar;