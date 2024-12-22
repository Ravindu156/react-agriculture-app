
import React, { useState } from 'react';
import NavigationBar from './StoreCom/NavigationBar';
import AgroCard from './StoreCom/AgroCard';
import './StoreAssets/StoreNav.css';


const InorganicProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample products data (you can replace this with your actual data)
  const products = [
    { id: 1, name: 'Carrot', price: 19.99 },
    { id: 2, name: 'Apple', price: 29.99, image: 'path/to/imageB.jpg' },
    { id: 3, name: 'Pinapple', price: 15.99, image: 'path/to/imageC.jpg' },
    // Add more products as needed
  ];

   // Function to handle search input change
   const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
            <AgroCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div> 
  );
};

export default InorganicProducts;