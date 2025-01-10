import React, { useState } from 'react';
import axios from 'axios';
import NavigationBar from '../Store/StoreCom/NavigationBar';

const Admin = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date().toLocaleDateString();
    const productData = {
      product: name,
      category,
      price,
      date: currentDate,
    };

    fetch('http://localhost:5000/ecom/seller-products/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
       
      })
      .catch((error) => console.error('Error:', error));
  };


  return (
    <div>
        <NavigationBar />
      <h1>Admin Panel</h1>
      <div className="admin-form">
        {/* Dropdown for Name */}
        <div>
          <p>Name of the product</p>
          <select value={name} onChange={(e) => setName(e.target.value)}>
            <option value="">Select Product</option>
            <option value="Carrot">Carrot</option>
            <option value="Apple">Apple</option>
            <option value="Pineapple">Pineapple</option>
          </select>
        </div>

        {/* Dropdown for Category */}
        <div>
          <p>Select the category</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Inorganic Product">Inorganic Product</option>
            <option value="Organic Product">Organic Product</option>
          </select>
        </div>

        
        

        {/* Input for Price */}
        <div>
          <p>Set New Price</p>
          <input
            type="number"
            placeholder="Enter new price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Button to Update Price */}
        <button onClick={handleSubmit}>Update Price</button>

        {/* Display Message */}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Admin;
