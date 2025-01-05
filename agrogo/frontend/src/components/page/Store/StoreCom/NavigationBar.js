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
<<<<<<< HEAD
      <li><Link to="/inorganic">Inorganic Products</Link></li>
      <li>
          <Link to="/Seller" className="sell-button">Sell</Link>
=======
      <li><Link to="/inorganic-products">Inorganic Products</Link></li>
      <li>
          <Link to="/Seller" className="sell-button">Sell Products</Link>
>>>>>>> f013fbe78ecdb2230aa1144d323d06e268bc80d0
      </li>
    </ul>
  </nav>
  );
};

export default NavigationBar;