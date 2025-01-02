
import React, { useState } from 'react';
import NavigationBar from '../Store/StoreCom/NavigationBar';
import AgroCard from '../Store/StoreCom/AgroCard';
import './StoreAssets/StoreNav.css';
import BarChart from './StoreCom/BarChart';

const InorganicProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductData, setSelectedProductData] = useState(null);
  //chart
  const chartData = [
    { day: 'Day 1', price: 20 },
    { day: 'Day 2', price: 30 },
    { day: 'Day 3', price: 25 },
    { day: 'Day 4', price: 35 },
    { day: 'Day 5', price: 40 },
    { day: 'Day 6', price: 30 },
    { day: 'Day 7', price: 50 },
];


  // Sample products data (you can replace this with your actual data)
  const products = [
    { id: 1, name: 'Carrot', price: 19.99,chartData: [
      { day: 'Day 1', price: 20 }, 
      { day: 'Day 2', price: 30 },
      { day: 'Day 3', price: 55 },
      { day: 'Day 4', price: 65 },
      { day: 'Day 5', price: 40 },] },
    { id: 2, name: 'Apple', price: 29.99, chartData: [
      { day: 'Day 1', price: 25 }, 
      { day: 'Day 2', price: 35 },
      { day: 'Day 3', price: 35 },
      { day: 'Day 4', price: 55 },
      { day: 'Day 5', price: 20 },] },
    { id: 3, name: 'Pinapple', price: 15.99,chartData: [
      { day: 'Day 1', price: 15 }, 
      { day: 'Day 2', price: 60 },
      { day: 'Day 3', price: 25 },
      { day: 'Day 4', price: 35 },
      { day: 'Day 5', price: 60 },] },
    // Add more products as needed
  ];

   // Function to handle search input change
   const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle product selection
  const handleProductSelect = (product) => {
    setSelectedProductData(product.chartData); // Update the chart data based on the selected product
  };


// Filter products based on search term
const filteredProducts = products.filter(product =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
   <div>
    <NavigationBar />
    <div className="search-container">
        <input
          type="text"
          placeholder="Search for Inorganic Products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <AgroCard key={product.id} 
            product={product} 
            onSelect={() => handleProductSelect(product)}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, padding: '20px' }}>
                
            </div>
            <div style={{ flex: 2, padding: '20px', marginRight: '20px' }}>
                <h2>Inorganic Products</h2>
                {selectedProductData ? (
                    <BarChart data={selectedProductData} />
                ) : (
                    <p>Select a product to see the price chart.</p>
                )}
            </div>
        </div>

    </div> 
  );
};

export default InorganicProducts;