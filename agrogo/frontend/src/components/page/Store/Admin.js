import React, { useState, useEffect } from 'react';
import NavigationBar from '../Store/StoreCom/NavigationBar';
import './StoreAssets/Admin.css';

const Admin = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [productList, setProductList] = useState([]);
  const [receiptsList, setReceiptsList] = useState([]);

  // Fetch existing products
  useEffect(() => {
    fetchProducts();
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    try {
      const response = await fetch('http://localhost:5000/ecom/recipts/allrec');
      const data = await response.json();
      setReceiptsList(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/ecom/seller-products/all');
      const data = await response.json();
      setProductList(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString();
    const productData = {
      product: name,
      category,
      price,
      date: currentDate,
    };

    try {
      const response = await fetch('http://localhost:5000/ecom/seller-products/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      const data = await response.json();
      console.log(data);
      fetchProducts(); // Refresh the product list after adding a new product
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/ecom/recipts/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setReceiptsList(receiptsList.filter(receipt => receipt._id !== id));
      } else {
        console.error('Failed to delete receipt');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="admin-form">
        <div className="container">
          <h2>Admin Panel</h2>
          {/* Dropdown for Name */}
          <div className="search-bar">
            <p>Name of the product:</p>
            <select className="search-barin" value={name} onChange={(e) => setName(e.target.value)}>
              <option value="">Select Product</option>
              <option value="Carrot">Carrot</option>
              <option value="Apple">Apple</option>
              <option value="Pineapple">Pineapple</option>
            </select>
          </div>

          {/* Dropdown for Category */}
          <div className="search-bar">
            <p>Select the category:</p>
            <select className="search-barin" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="Inorganic Product">Inorganic Product</option>
              <option value="Organic Product">Organic Product</option>
            </select>
          </div>

          {/* Input for Price */}
          <div className="search-bar">
            <p>Set New Price:</p>
            <input
              type="number"
              placeholder="Enter new price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="search-barin"
            />
          </div>

          {/* Button to Update Price */}
          <button onClick={handleSubmit}>Update Price</button>
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

        {/* Posted Receipts */}
        <h3>Posted Receipts</h3>
        <div className="product-list">
          {receiptsList.map((receipts, index) => (
            <div key={index} className="product-item">
              ID: {receipts._id}, Quantity: {receipts.totalQuantity}, Total Price: ${receipts.totalPrice}
              <button onClick={() => handleDelete(receipts._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
