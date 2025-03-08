import React, { useState, useEffect } from 'react';
import NavigationBar from '../Store/StoreCom/NavigationBar';
import './StoreAssets/Seller.css';
import BarChart from './StoreCom/BarChart';
import axios from 'axios';


const BuyProducts = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [chartData, setChartData] = useState([]);
    const [productList, setProductList] = useState([]);
  
     // Fetch chart data whenever name, category, or place changes
  useEffect(() => {
    if (name && category) {
      fetchChartData(name, category);
    }
  }, [name, category]);

  // Fetch existing products
    useEffect(() => {
      fetchProducts();
    }, []);

    const fetchProducts = () => {
      fetch('http://localhost:5000/ecom/seller-products/all')
        .then((response) => response.json())
        .then((data) => {
          setProductList(data);
        })
        .catch((error) => console.error('Error:', error));
    };

  // Function to fetch chart data from the backend
  const fetchChartData = async (name, category) => {
    try {
      const response = await axios.get('http://localhost:5000/ecom/seller-products/chart-data', {
        params: { name, category },
      });
      setChartData(response.data.chartData); // Update chart data
     
    } catch (error) {
      console.error('Error fetching chart data:', error);
      setChartData([]); // Reset chart data if there's an error
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

  
 
  
  
  return (
    <div>
      <NavigationBar />

    <div  className="inorganic-products-container"> 
    
        <div className="charts-display">

       

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

       

        </div> 
        {/* Product List */}
       <h3>Product List</h3>
        <div className="product-list">
          {productList.map((item, index) => (
            <div key={index} className="product-item">
              {item.product} - {item.category} - ${item.price}
            </div>
          ))}
        </div>
      </div>
   
  );
};

export default BuyProducts;