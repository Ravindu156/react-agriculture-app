import React from 'react';
import { useState } from 'react';
import '../page/Store/StoreAssets/StoreNav.css';
import '../page/Store/StoreAssets/Productlist.css';
import { Routes, Route, } from 'react-router-dom';
import NavigationBar from './Store/StoreCom/NavigationBar';
import ProductCard from './Store/StoreCom/ProductCard';
import Cart from './Store/Cart';
import Seller from './Store/StoreCom/Seller';
import Of from'./Store/StoreAssets/Img/OF.jpg';
import ONF from'./Store/StoreAssets/Img/NF.png';
import Nf from'./Store/StoreAssets/Img/FF.jpg';

const Store = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([
    {
        id: 1,
        name: 'Organic Fertilizer',
        price: 25.99,
        image: Of, // Replace with actual image path
    },
    {
        id: 2,
        name: 'Farming Tool Set',
        price: 49.99,
        image: ONF, // Replace with actual image path
    },
    {
        id: 3,
        name: 'Inorganic Fertilizer',
        price: 19.99,
        image: Nf, // Replace with actual image path
    },
    // Add  products 
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