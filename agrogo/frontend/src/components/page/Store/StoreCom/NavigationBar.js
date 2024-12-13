import React from 'react';
import '../StoreAssets/StoreNav.css';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className="nav-bar">
    <ul>
      <li><Link to="">Fertilizers</Link></li>
      <li><Link to="">Farming Tools</Link></li>
      <li><Link to="">Organic Products</Link></li>
      <li><Link to="">Inorganic Products</Link></li>
    </ul>
  </nav>
  );
};

export default NavigationBar;