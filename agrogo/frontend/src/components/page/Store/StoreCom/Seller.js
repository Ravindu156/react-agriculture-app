import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../StoreAssets/Seller.css'

import NavigationBar from './NavigationBar';



const Seller = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [place, setPlace] = useState("");
    const [lastUpdatedPrice, setLastUpdatedPrice] = useState(0);
    const [lastUpdatedDate, setLastUpdatedDate] = useState("");
     const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const [productListon, setProductListon] = useState([]);

    useEffect(() => {
        if (name && category) {
            fetch(`http://localhost:5000/ecom/price/chart-data?name=${name}&category=${category}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.chartData && data.chartData.length > 0) {
                        const lastPrice = data.chartData[data.chartData.length - 1].price;
                        const lastDate = data.chartData[data.chartData.length - 1].date;
                        setLastUpdatedPrice(lastPrice);
                        setLastUpdatedDate(lastDate);
                    } else {
                        setLastUpdatedPrice(0);
                        setLastUpdatedDate("");
                    }
                })
                .catch((error) => console.error('Error:', error));
        } else {
            setLastUpdatedPrice(0);
            setLastUpdatedDate("");
        }
    }, [name, category]);

    useEffect(() => {
            
            fetchOnProducts();
            
        }, []);
    
    const fetchOnProducts = () => {
            fetch('http://localhost:5000/ecom/seller-products/all')
                .then((response) => response.json())
                .then((data) => {
                    setProductListon(data);
                })
                .catch((error) => console.error('Error:', error));
        };

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


      
    return (

       <div >
        <NavigationBar />
        <div className="seller-form">
            <div  className="grid-container">
             <h2 className="font1">ADD ORDER</h2>
            <form onSubmit={handleSubmit}>
            <p className="font3">Name of the product</p>
                <select value={name} onChange={(e) => setName(e.target.value)}>
            <option value="Carrot">Carrot</option>
            <option value="Apple">Apple</option>
            <option value="Pineapple">Pineapple</option>
                </select>
             <p className="font3">Select the category</p>    
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Inorganic Product">Inorganic Product</option>
                    <option value="Organic Product">Organic Product</option>
                </select>

            <p className="font3">Select the place</p>    
                <select value={place} onChange={(e) => setPlace(e.target.value)}>
                    <option value="Nuwaraeliya">Nuwaraeliya</option>
                    <option value="jaffna">Jaffna</option>
                </select>   
              
             <p className="font3">Quantity (in Kg)</p>
                <input
                    
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                    required
                />
                 <p className="font3">give a description</p>
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button type="submit">Add Order</button>
            </form>
            </div>
        </div>
        <div className="seller-form">
        <div className="grid-container">
            <h1 className="font2"> Last Updated Price   : <span style={{ fontSize: 36, fontWeight: 'bold' }}>
                {lastUpdatedPrice}</span> <br />
                Date   : <span style={{ fontSize: 36, fontWeight: 'bold' }}>{lastUpdatedDate}</span> </h1>
        </div>

       
                        <div className="order-bookII">
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
        

    );
};

export default Seller;