import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../StoreAssets/Seller.css'
import BarChart from '../StoreCom/BarChart';
import NavigationBar from './NavigationBar';
import axios from 'axios';


const Seller = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [place, setPlace] = useState("");
    const [chartData, setChartData] = useState([]);
     const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
          product: name,
          category,
          place,
          quantity,
          description,
        };
      
        fetch('http://localhost:5000/ecom/seller-products/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            navigate('/inorganic'); // Redirect to the store page after successful submission
          })
          .catch((error) => console.error('Error:', error));
      };

      useEffect(() => {
        if (name && category) {
          fetchChartData(name, category);
        }
      }, [name, category]);
    
      // Function to fetch chart data from the backend
      const fetchChartData = async (name, category) => {
        try {
          const response = await axios.get('http://localhost:5000/ecom/seller-products/chart-data', {
            params: { name, category},
          });
          setChartData(response.data); // Update chart data
        } catch (error) {
          console.error('Error fetching chart data:', error);
          setChartData([]); // Reset chart data if there's an error
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

    return (

       <div>
        <NavigationBar />
        <div className="seller-form">
             <h2>Add a New Product</h2>
            <form onSubmit={handleSubmit}>
            <p>Name of the product</p>
                <select value={name} onChange={(e) => setName(e.target.value)}>
            <option value="Carrot">Carrot</option>
            <option value="Apple">Apple</option>
            <option value="Pineapple">Pineapple</option>
                </select>
             <p>Select the category</p>    
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Inorganic Product">Inorganic Product</option>
                    <option value="Organic Product">Organic Product</option>
                </select>

            <p>Select the place</p>    
                <select value={place} onChange={(e) => setPlace(e.target.value)}>
                    <option value="Nuwaraeliya">Nuwaraeliya</option>
                    <option value="jaffna">Jaffna</option>
                </select>   
              
             <p>Quantity (in Kg)</p>
                <input
                    
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                    required
                />
                 <p>give a description</p>
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button type="submit">SELL</button>
            </form>
            
        </div>
        <div className="charts-display">
          <div style={{ flex: 1, padding: '20px' }}>
            <h2>Product Sales Charts</h2>
          </div>
          <div style={{ flex: 2, padding: '20px', marginRight: '20px' }}>
            {chartData.length > 0 ? (
              <BarChart data={formatChartData()} />
            ) : (
              <p >Select a product to see the price chart.</p>
            )}
          </div>
        </div>
        </div>

        

    );
};

export default Seller;