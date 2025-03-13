import React, { useState, useEffect } from 'react';
import NavigationBar from '../Store/StoreCom/NavigationBar';
import './StoreAssets/Seller.css';
import BarChart from './StoreCom/BarChart';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BuyProducts = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [buyerid, setBuyerid] = useState('');
    const [chartData, setChartData] = useState([]);
    const [productList, setProductList] = useState([]);
    const [receipt, setReceipt] = useState({
        currentPrice: 0,
        date: '',
        selectedProducts: [],
        totalQuantity: 0,
        totalPrice: 0,
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (name && category) {
            fetchChartData(name, category);
        }
    }, [name, category]);

    useEffect(() => {
        if (name) {
            fetchProductList(name);
        }
    }, [name]);

    const fetchChartData = async (name, category) => {
        try {
            const response = await axios.get('http://localhost:5000/ecom/price/chart-data', {
                params: { name, category },
            });
            setChartData(response.data.chartData);
            setReceipt((prev) => ({
                ...prev,
                currentPrice: response.data.lastPrice,
                date: response.data.lastDate,
            }));
        } catch (error) {
            console.error('Error fetching chart data:', error);
            setChartData([]);
        }
    };

    const fetchProductList = async (name) => {
        try {
            const response = await axios.get('http://localhost:5000/ecom/seller-products/products-by-name', {
                params: { name },
            });
            setProductList(response.data);
        } catch (error) {
            console.error('Error fetching product list:', error);
            setProductList([]);
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

    const handleSelect = (productId) => {
        const selectedProduct = productList.find((product) => product._id === productId);
        if (selectedProduct) {
            const updatedProductList = productList.filter((product) => product._id !== productId);
            setProductList(updatedProductList);
            setReceipt((prev) => ({
                ...prev,
                selectedProducts: [...prev.selectedProducts, selectedProduct],
                totalQuantity: prev.totalQuantity + selectedProduct.quantity,
                totalPrice: (prev.totalQuantity + selectedProduct.quantity) * prev.currentPrice,
            }));
        }
    };

    const handleRemove = (productId) => {
        const updatedSelectedProducts = receipt.selectedProducts.filter((product) => product._id !== productId);
        const updatedTotalQuantity = receipt.totalQuantity - receipt.selectedProducts.find((product) => product._id === productId).quantity;
        const updatedTotalPrice = updatedTotalQuantity * receipt.currentPrice;

        setReceipt((prev) => ({
            ...prev,
            selectedProducts: updatedSelectedProducts,
            totalQuantity: updatedTotalQuantity,
            totalPrice: updatedTotalPrice,
        }));
    };
      //receipt submit
    const handleSubmit =  (e) => { 
        e.preventDefault();
        const formattedReceipt = {
              buyerId: buyerid, // Ensure buyer ID is included
              currentPrice: receipt.currentPrice,
              selectedProducts: receipt.selectedProducts.map(product => ({
                  productId: product._id,
                  quantity: product.quantity
              })),
              totalQuantity: receipt.totalQuantity,
              totalPrice: receipt.totalPrice
          };
  
         
          
          fetch('http://localhost:5000/ecom/recipts/receipts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formattedReceipt),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              navigate('/inorganic'); // Redirect to the store page after successful submission
            })
            .catch((error) => console.error('Error:', error));
        };

    return (
        <div>
            <NavigationBar />
            <div className="inorganic-products-container">
            <div className="chart-bookI">
                <div className="charts-display">
                    <div className="grid-container">
                    <h2 className="font1">FILL ORDER</h2>
                    <div className="search-bar">
                        <p>Supplier ID:</p>
                        <input
                            type="number"
                            placeholder="Enter ID"
                            value={buyerid}
                            onChange={(e) => setBuyerid(e.target.value)}
                            className="search-barin"
                        />
                    </div>
                    <div className="search-bar">
                        <p>Name of the product</p>
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
                        </select>
                    </div>
                    <div className="search-bar">
                        <p>Select the category</p>
                        <select className="search-barin" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select Category</option>
                            <option value="Inorganic Product">Inorganic Product</option>
                            <option value="Organic Product">Organic Product</option>
                        </select>
                    </div>
                </div>
                <div className="charts-display">
                    <div style={{ flex: 1, padding: '20px' }}>
                        <h2>Product Sales Charts</h2>
                    </div>
                    <div style={{ flex: 2, padding: '20px', marginRight: '20px' }}>
                        {chartData.length > 0 ? (
                            <BarChart data={formatChartData()} chartType="price" />
                        ) : (
                            <p>Select a product to see the price chart.</p>
                        )}
                    </div>
                </div>
                </div>
                </div>

                <div className="order-bookI">
                <div className="receipt">
                  <h2 className="font1">Supplier Receipt</h2>
                    <p><strong>Current Price:</strong> {receipt.currentPrice}</p>
                    <p><strong>Date:</strong> {receipt.date}</p>
                    <p><strong>Selected Products:</strong></p>
                    <ul>
                        {receipt.selectedProducts.map((product) => (
                            <li key={product._id}>
                                ID: {product._id}, Quantity: {product.quantity}
                                <button className="button3" onClick={() => handleRemove(product._id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <p><strong>Total Quantity:</strong> {receipt.totalQuantity}</p>
                    <p><strong>Total Price:</strong> {receipt.totalPrice}</p>
                    <button className="button" onClick={handleSubmit}>Submit Receipt</button>
                </div>
                </div> 
                
                <div className="select-bookI">
                <div className="list-display">
                <h2 className="font1">AVAILABLE ORDERS</h2>
                    <div className="grid-container">
                   
                        {productList.length > 0 ? (
                            productList.map((product) => (
                                <div className="item1">
                                <li  key={product._id}>
                                    <span>ID: {product._id}, <br />Ask Quantity: {product.quantity}.Kg</span>
                                    <button className="button2" onClick={() => handleSelect(product._id)}>Select</button>
                                </li>
                                </div>
                            ))
                        ) : (
                            <p>No products available with quantity greater than 0.</p>
                        )}
                    
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default BuyProducts;
