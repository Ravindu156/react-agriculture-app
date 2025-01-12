

import React, { useState, useEffect } from 'react';
import NavigationBar from '../Store/StoreCom/NavigationBar';
import './StoreAssets/Seller.css';
import BarChart from './StoreCom/BarChart';
import axios from 'axios';
import Seller from './StoreCom/Seller';

const BuyProducts = () => {
    const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [buyerid, setBuyerid] = useState('');
  const [chartData, setChartData] = useState([]);
  const [productList, setProductList] = useState([]); // State to store the list of products

     // Fetch chart data whenever name, category, or place changes
  useEffect(() => {
    if (name && category) {
      fetchChartData(name, category);
    }
  }, [name, category]);

  // Fetch product list whenever name changes
  useEffect(() => {
    if (name) {
      fetchProductList(name);
    }
  }, [name]);


  // Function to fetch chart data from the backend
  const fetchChartData = async (name, category) => {
    try {
      const response = await axios.get('http://localhost:5000/ecom/seller-products/chart-data', {
        params: { name, category},
      });
      setChartData(response.data); // Update chart data
    } catch (error) {
      console.error('Error fetching chart data:', error);
      setChartData([]); // Reset chart data if there's an error
    }
  };
  
  // Function to fetch product list from the backend
  const fetchProductList = async (name) => {
    try {
      const response = await axios.get('http://localhost:5000/ecom/seller-products/products-by-name', {
        params: { name },
      });
      setProductList(response.data); // Update product list
    } catch (error) {
      console.error('Error fetching product list:', error);
      setProductList([]); // Reset product list if there's an error
    }
  };



  const formatChartData = () => {
    if (chartData.length > 0) {
      const labels = chartData.map((data) => data.date);
      const prices = chartData.map((data) => data.price);

      return { labels, prices };
    } else {
      return { labels: [], prices: [] };
    }
  };

  const handleSelect = (productId) => {
    console.log(`Selected product ID: ${productId}`);
    // Add your logic here to handle the selected product
  };


  return (
    <div>
      <NavigationBar />
      <div className="inorganic-products-container">
        {/* Dropdown for Name */}
        <div className="charts-display">

        <div  className="search-bar">
          <p>Buyer ID   :</p>
          <input
            type="number"
            placeholder="Enter ID"
            value={buyerid}
            onChange={(e) => setBuyerid(e.target.value)}
            className="search-barin"
          />
        </div>

        <div className="search-bar">
          <p>Name of the product</p>
          <select className="search-barin" value={name} onChange={(e) => setName(e.target.value)}>
            <option value="">Select Product</option>
            <option value="Carrot">Carrot</option>
            <option value="Apple">Apple</option>
            <option value="Pineapple">Pineapple</option>
          </select>
        </div>

        {/* Dropdown for Category */}
        <div className="search-bar">
          <p>Select the category</p>
          <select className="search-barin" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Inorganic Product">Inorganic Product</option>
            <option value="Organic Product">Organic Product</option>
          </select>
        </div>
        </div>
      

        {/* Chart Display */}
        <div className="charts-display">
          <div style={{ flex: 1, padding: '20px' }}>
            <h2>Product Sales Charts</h2>
          </div>
          <div style={{ flex: 2, padding: '20px', marginRight: '20px' }}>
            {chartData.length > 0 ? (
              <BarChart data={formatChartData()} />
            ) : (
              <p >Select a product to see the price chart.</p>
            )}
          </div>
        </div>

        <div className="list-display">
          <h3>Available Products</h3>
          <ul>
            {productList.length > 0 ? (
              productList.map((product) => (
                <li key={product._id}>
                  <span>ID: {product._id}, Quantity: {product.quantity}</span>
                  <button onClick={() => handleSelect(product._id)}>Select</button>
                </li>
              ))
            ) : (
              <p>No products available for the selected name.</p>
            )}
          </ul>
        </div>

      </div>
    </div>
    
  );
};

export default BuyProducts;