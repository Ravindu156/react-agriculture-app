import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../StoreAssets/Seller.css'

import NavigationBar from './NavigationBar';



const Seller = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState("");
    const [place, setPlace] = useState("");
    const [lastUpdatedPrice, setLastUpdatedPrice] = useState(0);
    const [lastUpdatedDate, setLastUpdatedDate] = useState("");
     const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const [productListon, setProductListon] = useState([]);
    const [productListex, setProductListex] = useState([]);

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
            fetchExProducts();
            
        }, []);
    
    const fetchOnProducts = () => {
            fetch('http://localhost:5000/ecom/seller-products/all')
                .then((response) => response.json())
                .then((data) => {
                    setProductListon(data);
                })
                .catch((error) => console.error('Error:', error));
        };

        const fetchExProducts = () => {
            fetch('http://localhost:5000/ecom/exproduct/eall')
                .then((response) => response.json())
                .then((data) => {
                    setProductListex(data);
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
            alert('ORDER submitted successfully!');
            navigate('/inorganic'); // Redirect to the store page after successful submission
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

       <div >
        <NavigationBar />
        <div className="seller-form">
            <div  className="grid-container">
             <h2 className="font1">ADD ORDER</h2>
            <form onSubmit={handleSubmit}>
            <p className="font3">Name of the product</p>
                <select value={name} onChange={(e) => setName(e.target.value)}>
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
             <p className="font3">Select the category</p>    
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Inorganic Product">Inorganic Product</option>
                    <option value="Organic Product">Organic Product</option>
                </select>

            <p className="font3">Select the place</p>    
                <select value={place} onChange={(e) => setPlace(e.target.value)}>
                <option value="Ampara">Ampara</option>
                            <option value="Anuradhapura">Anuradhapura</option>
                            <option value="Badulla">Badulla</option>
                            <option value="Batticaloa">Batticaloa</option>
                            <option value="Colombo">Colombo</option>
                            <option value="Galle">Galle</option>
                            <option value="Gampaha">Gampaha</option>
                            <option value="Hambantota">Hambantota</option>
                            <option value="Jaffna">Jaffna</option>
                            <option value="Kalutara">Kalutara</option>
                            <option value="Kandy">Kandy</option>
                            <option value="Kegalle">Kegalle</option>
                            <option value="Kilinochchi">Kilinochchi</option>
                            <option value="Kurunegala">Kurunegala</option>
                            <option value="Mannar">Mannar</option>
                            <option value="Matale">Matale</option>
                            <option value="Matara">Matara</option>
                            <option value="Monaragala">Monaragala</option>
                            <option value="Mullaitivu">Mullaitivu</option>
                            <option value="Nuwara Eliya">Nuwara Eliya</option>
                            <option value="Polonnaruwa">Polonnaruwa</option>
                            <option value="Puttalam">Puttalam</option>
                            <option value="Ratnapura">Ratnapura</option>
                            <option value="Trincomalee">Trincomalee</option>
                            <option value="Vavuniya">Vavuniya</option>
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
        <br />
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