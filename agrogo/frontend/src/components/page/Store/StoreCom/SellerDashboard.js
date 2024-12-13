import React, { useState } from 'react';

const SellerDashboard = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = () => {
    // Logic to add the new product to the database
    console.log('New product added:', newProduct);
  };

  return (
    <div className="seller-dashboard">
      <h2>Add New Product</h2>
      <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Product Name" />
      <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} placeholder="Product Description" />
      <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} placeholder="Product Price" />
      <input type="text" name="image" value={newProduct.image} onChange={handleInputChange} placeholder="Image URL" />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default SellerDashboard;