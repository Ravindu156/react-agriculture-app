import React from 'react';
import '../page/Store/StoreAssets/StoreNav.css';
import { Routes, Route, } from 'react-router-dom';
import Fertilizers from './Store/Fertilizers';
import FarmingTools from './Store/FarmingTools';
import OrganicProducts from './Store/OrganicProducts';
import InorganicProducts from './Store/InorganicProducts';
import NavigationBar from './Store/StoreCom/NavigationBar';


const Store = () => {
  return (
    <div>
    <NavigationBar />
    <Routes>
      <Route path="/store/fertilizers" element={<Fertilizers />} />
      <Route path="/store/farming-tools" element={<FarmingTools />} />
      <Route path="/store/organic-products" element={<OrganicProducts />} />
      <Route path="/store/inorganic-products" element={<InorganicProducts />} />
    </Routes>
  </div>
  );
};

export default Store;