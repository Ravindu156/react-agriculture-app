

import React, { useState, useEffect } from 'react';
import NavigationBar from '../Store/StoreCom/NavigationBar';
import './StoreAssets/Inorganic.css';
import BarChart from './StoreCom/BarChart';
import axios from 'axios';
import Seller from './StoreCom/Seller';

const BuyProducts = () => {
    const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [place, setPlace] = useState('');
  const [chartData, setChartData] = useState([]);
     
     // Fetch chart data whenever name, category, or place changes
  useEffect(() => {
    if (name && category && place) {
      fetchChartData(name, category, place);
    }
  }, [name, category, place]);

  // Function to fetch chart data from the backend
  const fetchChartData = async (name, category, place) => {
    try {
      const response = await axios.get('http://localhost:5000/api/chart-data', {
        params: { name, category, place },
      });
      setChartData(response.data); // Update chart data
    } catch (error) {
      console.error('Error fetching chart data:', error);
      setChartData([]); // Reset chart data if there's an error
    }
  };
  
  
  return (
    <div>
      <NavigationBar />
      <div className="inorganic-products-container">
        {/* Dropdown for Name */}
        <div className="search-bar">
          <p>Name of the product</p>
          <select value={name} onChange={(e) => setName(e.target.value)}>
            <option value="">Select Product</option>
            <option value="Carrot">Carrot</option>
            <option value="Apple">Apple</option>
            <option value="Pineapple">Pineapple</option>
          </select>
        </div>

        {/* Dropdown for Category */}
        <div className="search-bar">
          <p>Select the category</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Inorganic Product">Inorganic Product</option>
            <option value="Organic Product">Organic Product</option>
          </select>
        </div>

        {/* Dropdown for Place */}
        <div className="search-bar">
          <p>Select the place</p>
          <select value={place} onChange={(e) => setPlace(e.target.value)}>
            <option value="">Select Place</option>
            <option value="Nuwaraeliya">Nuwaraeliya</option>
            <option value="Jaffna">Jaffna</option>
          </select>
        </div>

        {/* Chart Display */}
        <div className="charts-display">
          <div style={{ flex: 1, padding: '20px' }}>
            <h2>Product Sales Charts</h2>
          </div>
          <div style={{ flex: 2, padding: '20px', marginRight: '20px' }}>
            {chartData.length > 0 ? (
              <BarChart data={chartData} />
            ) : (
              <p >Select a product to see the price chart.</p>
            )}
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default BuyProducts;