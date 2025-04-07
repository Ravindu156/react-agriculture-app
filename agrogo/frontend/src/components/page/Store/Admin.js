import React, { useState, useEffect } from 'react';
import NavigationBar from '../Store/StoreCom/NavigationBar';
import './StoreAssets/Admin.css';

const Admin = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [productList, setProductList] = useState([]);
  const [receiptsList, setReceiptsList] = useState([]);
  const [productListex, setProductListex] = useState([]);
  const [product, setProduct] = useState("");
  // Fetch existing products
  useEffect(() => {
    fetchProducts();
    fetchReceipts();
    fetchExProducts();
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
      const response = await fetch('http://localhost:5000/ecom/price/all');
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
      const response = await fetch('http://localhost:5000/ecom/price/setprice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      const data = await response.json();
      console.log(data);
      alert('Price updated successfully!');
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

  const fetchExProducts = () => {
    fetch('http://localhost:5000/ecom/exproduct/eall')
      .then((response) => response.json())
      .then((data) => {
        setProductListex(data);
      })
      .catch((error) => console.error('Error:', error));
  };

  const ehandleSubmit = (e) => {
    e.preventDefault();
    const eproductData = {product};
  
    fetch('http://localhost:5000/ecom/exproduct/ecreate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eproductData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert('Product submitted successfully!');
        fetchExProducts();

      })
      .catch((error) => console.error('Error:', error)
    );
      
  };

  return (
    <div>
      <NavigationBar />
      <div className="admin-form">
        <div className='adminBtn'>
          <a href="/admin/products" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Products
          </a>
          <a href="/admin/orders" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 ml-4">
            Order
          </a>
        </div>
        <h2 className="font1">Exchange Admin Panel</h2>
        <div className="seller-form">

          <div className="grid-container">
            <h2 className="font1">SET PRICE</h2>
            {/* Dropdown for Name */}
            <div className="search-bar">
              <p>Name of the product:</p>
              <select className="search-barin" value={name} onChange={(e) => setName(e.target.value)}>
                <option value="">Select Product</option>
                <option value="Carrot">Carrot</option>
                <option value="Pumpkin">Pumpkin</option>
                <option value="Brinjal">Brinjal</option>
                <option value="Cabbage">Cabbage</option>
                <option value="Beans">Beans</option>
                <option value="Drumsticks">Drumsticks</option>
                <option value="Bitter Gourd">Bitter Gourd</option>
                <option value="Snake Gourd">Snake Gourd</option>
                <option value="Ridge Gourd">Ridge Gourd</option>
                <option value="Ladies' Fingers">Ladies' Fingers</option>
                <option value="Leeks">Leeks</option>
                <option value="Spinach">Spinach</option>
                <option value="Ash Plantain">Ash Plantain</option>
                <option value="Tomato">Tomato</option>
                <option value="Green Chilli">Green Chilli</option>
                <option value="Capsicum">Capsicum</option>
                <option value="Cucumber">Cucumber</option>
                <option value="Radish">Radish</option>
                <option value="Turnip">Turnip</option>
                <option value="Winged Beans">Winged Beans</option>
                {productListex.map((item) => (
                  <option value={item.product} >
                    {item.product}
                  </option>
                ))}
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
          <h2 className="font1">PRICE LIST</h2>
          <div className="productp-list">
            {productList.map((item, index) => (
              <div key={index} className="productp-item">
                {item.product} - {item.category} - Rs.{item.price}
              </div>
            ))}
          </div>
        </div>
        <div className="seller-form">
        <div className="grid-container">
        <form onSubmit={ehandleSubmit}>
        <p className="font1">ADD PRODUCT</p>
        
        <p className="font3">Product Name</p>
        <input className="addproduct"
                    
                    type="String"
                    placeholder="New product"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    
                    required
                />
            <button type="submit">Add Product to the List</button>
          </form>        
        </div>
         
         
          {/* Posted Receipts */}
          <br />

          <h2 className="font1">COMPLETED ORDERS</h2>
          <div className="product-list">
            {receiptsList.map((receipts, index) => (
              <div key={index} className="product-item">
                ID: {receipts._id}, Quantity: {receipts.totalQuantity}, Total Price: Rs.{receipts.totalPrice}
                <button className="button3" onClick={() => handleDelete(receipts._id)}>Confirm Order Fill</button>
              </div>
            ))}
          </div>
          
        
          
        </div>
      </div>

    </div>
  );
};

export default Admin;
