import React from 'react';
import { useState } from 'react';
import '../page/Store/StoreAssets/StoreNav.css';
import { Routes, Route, } from 'react-router-dom';
import NavigationBar from './Store/StoreCom/NavigationBar';
import ProductCard from './Store/StoreCom/ProductCard';
import Cart from './Store/Cart';
import Seller from './Store/StoreCom/Seller';

const Store = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([
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
    // Add more initial products as needed
]);

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  
const handleAddToCart = (product) => {
  setCart((prevCart) => [...prevCart, product]);
};

const handleRemoveFromCart = (productId) => {
  setCart((prevCart) => prevCart.filter(item => item.id !== productId));
};

  return (
    <div>
    <NavigationBar />
    <Routes>
                <Route path="/store" element={<ProductCard products={products} />} />
                <Route path="/sell" element={<Seller onAddProduct={handleAddProduct} />} />
                {/* Add other routes as needed */}
            </Routes>
    <div className="product-list">
                {products.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={handleAddToCart}
                   /> 
                ))}
            </div>
    
            <Cart cartItems={cart} onRemoveFromCart={handleRemoveFromCart} /> {/* Render the Cart component */}
  </div>
  );
};

export default Store;