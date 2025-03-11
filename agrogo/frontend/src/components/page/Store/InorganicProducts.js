import React, { useState, useEffect } from 'react';
import NavigationBar from '../Store/StoreCom/NavigationBar';
import './StoreAssets/Seller.css';
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
                <div className="order-book">
                    {/* Product List */}
                    <h3>Product List</h3>
                    <div className="product-list">
                        {productList.map((item, index) => (
                            <div key={index} className="product-item">
                                {item.product} - {item.category} - ${item.price}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="charts-display">
                    
                        {/* Chart Display */}
                        <div className="charts-display">
                        <div className="chart-book">
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
                            <div style={{ flex: 2, padding: '20px', marginRight: '20px' }}>
                                {quantityChartData.length > 0 ? (
                                    <BarChart data={formatQuantityChartData()} />
                                ) : (
                                    <p>Quantity data is not available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="select-book">
                        <div className="search-bar">
                            <p>Name of the product</p>
                            <select className="search-barin" value={name} onChange={(e) => setName(e.target.value)}>
                                <option value="">Select Product</option>
                                <option value="Carrot">Carrot</option>
                                <option value="Apple">Apple</option>
                                <option value="Pineapple">Pineapple</option>
                            </select>
                            
                        </div>
                        {/* Dropdown for Category */}
                        <div className="search-bar">
                            <p>Select the category</p>
                            <select className="search-barin" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Select Category</option>
                                <option value="Inorganic Product">Inorganic Product</option>
                                <option value="Organic Product">Organic Product</option>
                            </select>
                        </div>
                        <div className="product-list">
                        {productListon.map((item, index) => (
                            <div key={index} className="product-item">
                                {item.product} - {item.category} - {item.quantity}kg
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
