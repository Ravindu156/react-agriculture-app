import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className="nav-bar">
    <ul>
      <li>
        <Link to="/store/fertilizers">Fertilizers</Link>
      </li>
      <li>
        <Link to="/store/farming-tools">Farming Tools</Link>
      </li>
      <li>
        <Link to="/store/organic-products">Organic Products</Link>
      </li>
      <li>
        <Link to="/store/inorganic-products">Inorganic Products</Link>
      </li>
    </ul>
  </nav>
  );
};

export default NavigationBar;