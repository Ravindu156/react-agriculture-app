import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../StoreAssets/Seller.css'

import NavigationBar from './NavigationBar';



const Seller = ({ onAddProduct }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Fertilizer');
    const [quantity, setQuantity] = useState(1);
    const [place, setPlace] = useState(1);
    const [price, setPrice] = useState(1);
    const [product, setProduct] = useState(1);
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
          product: name,
          category,
          place,
          price,
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
            navigate('/store'); // Redirect to the store page after successful submission
          })
          .catch((error) => console.error('Error:', error));
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
                    <option value="Beans">Beans Product</option>
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
              

                <p>Ask Price</p>
                <input
                    
                    type="number"
                    placeholder="price"
                    value={price}

                    onChange={(e) => setPrice(e.target.value)}
                    min="1"
                    required
                />


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
                <button type="submit">Add Product</button>
            </form>
        </div>
        </div>

        

    );
};

export default Seller;