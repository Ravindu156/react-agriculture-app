import React from 'react';
import NavigationBar from './StoreCom/NavigationBar';
import './StoreAssets/StoreNav.css';
import ProductCard from './StoreCom/ProductCard';
const Fertilizers = () => {
  const products = [
    {
        id: 1,
        name: 'Organic Fertilizer',
        price: 25.99,
        image: 'path/to/organic-fertilizer.jpg', // Replace with actual image path
    },
    {
        id: 2,
        name: 'Farming Tool Set',
        price: 49.99,
        image: 'path/to/farming-tool-set.jpg', // Replace with actual image path
    },
    {
        id: 3,
        name: 'Inorganic Fertilizer',
        price: 19.99,
        image: 'path/to/inorganic-fertilizer.jpg', // Replace with actual image path
    },
    // Add more products as needed
];

  return (
   <div>
    <NavigationBar/>
    <div className="product-list">
                {products.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} />
                ))}
            </div>
    </div> 
    
  );
};

export default Fertilizers;