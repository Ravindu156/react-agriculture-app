import React, { useState, useEffect } from 'react';
import NavigationBar from '../Store/StoreCom/NavigationBar';
import './StoreAssets/Inorganic.css';
import BarChart from './StoreCom/BarChart';
import axios from 'axios';

const BuyProducts = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [chartData, setChartData] = useState([]);
    const [quantityChartData, setQuantityChartData] = useState([]);
    const [productList, setProductList] = useState([]);
    const [productListon, setProductListon] = useState([]);
  
    // Fetch chart data whenever name, category changes
    useEffect(() => {
        if (name && category) {
            fetchChartData(name, category);
        }
    }, [name, category]);

    // Fetch existing products
    useEffect(() => {
        fetchProducts();
        fetchOnProducts();
        fetchQuantityChartData();
    }, []);

    const fetchProducts = () => {
        fetch('http://localhost:5000/ecom/price/all')
            .then((response) => response.json())
            .then((data) => {
                setProductList(data);
            })
            .catch((error) => console.error('Error:', error));
    };

    const fetchOnProducts = () => {
        fetch('http://localhost:5000/ecom/seller-products/all')
            .then((response) => response.json())
            .then((data) => {
                setProductListon(data);
            })
            .catch((error) => console.error('Error:', error));
    };

    // Function to fetch price chart data from the backend
    const fetchChartData = async (name, category) => {
        try {
            const response = await axios.get('http://localhost:5000/ecom/price/chart-data', {
                params: { name, category },
            });
            setChartData(response.data.chartData);
        } catch (error) {
            console.error('Error fetching chart data:', error);
            setChartData([]);
        }
    };

    // Function to fetch quantity chart data
    const fetchQuantityChartData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/ecom/seller-products/chart-quantity-data');
            setQuantityChartData(response.data.chartData);
        } catch (error) {
            console.error('Error fetching quantity chart data:', error);
            setQuantityChartData([]);
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

    const formatQuantityChartData = () => {
        if (quantityChartData.length > 0) {
            const labels = quantityChartData.map((data) => data.product);
            const quantities = quantityChartData.map((data) => data.quantity);
            return { labels, quantities };
        } else {
            return { labels: [], quantities: [] };
        }
    };

    return (
        <div>
            <NavigationBar />
            <div className="inorganic-products-container">
                <div className="order-bookI">
                    {/* Product List */}
                    
                    <div className="grid-container">
                    <h2 className="font1">PRICE LIST</h2>
                        {productList.map((item, index) => (
                            <div key={index} className="item1">
                               
                                {item.product} ---- {item.category} ---- Rs: {item.price}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="charts-display">
                    
                        {/* Chart Display */}
                        <div className="charts-display">
                        <div className="chart-bookI">
                            <div style={{ flex: 1, padding: '20px' }}>
                                <h2 className="font1">PRICE VOLUME INDEX</h2>
                            </div>
                            <div style={{ flex: 2, padding: '20px', marginRight: '20px' }}>
                                {chartData.length > 0 ? (
                                    <BarChart data={formatChartData()} chartType="price" />
                                ) : (
                                    <p>Select a product to see the price chart.</p>
                                )}
                            </div>
                            <div style={{ flex: 2, padding: '20px', marginRight: '20px' }}>
                                {quantityChartData.length > 0 ? (
                                    <BarChart data={formatQuantityChartData()} />
                                ) : (
                                    <p>Quantity data is not available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="select-bookI">
                        <div className="search-div">
                            <p>Select the product </p>
                            <select className="search-barini" value={name} onChange={(e) => setName(e.target.value)}>
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
                        
                        {/* Dropdown for Category */}
                        <div className="search-div">
                            <p>Select the Category</p>
                            <select className="search-barini" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Select Category</option>
                                <option value="Inorganic Product">Inorganic Product</option>
                                <option value="Organic Product">Organic Product</option>
                            </select>
                        </div>
                        <h2 className="font1">ORDER BOOK</h2>
                        <div className="order-list">
                            
                        {productListon.map((item, index) => (
                            <div key={index} className="order-item">
                                {item.product} --- {item.category} --- {item.quantity}kg
                            </div>
                        ))}
                        </div>
                        </div>
                        
                </div>
            </div>
        </div>
    );
};

export default BuyProducts;
