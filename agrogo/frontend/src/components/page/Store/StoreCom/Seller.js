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
        const product = {
            id: Date.now(), // Simple ID generation
            product,
            category,
            place,
            price: 0, // Set a default price or add a price input
            quantity,
            description,
        };
        onAddProduct(product); // Call the function to add the product
        navigate('/store'); // Redirect to the store page
    };

    return (

       <div>
        <NavigationBar />
        <div className="seller-form">
             

        


            <h2>Add a New Product</h2>
            <form onSubmit={handleSubmit}>
            <p>Name of the product</p>
                <select value={product} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Carrot">Carrot</option>
                    <option value="Beans">Beans Product</option>
                </select>
             <p>Select the category</p>    
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Inorganic Product">Inorganic Product</option>
                    <option value="Organic Product">Organic Product</option>
                </select>

            <p>Select the place</p>    
                <select value={place} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Nuwaraeliya">Nuwaraeliya</option>
                    <option value="jaffna">Jaffna</option>
                </select>   
              

                <p>Ask Price</p>
                <input
                    
                    type="number"
                    placeholder="price"
                    value={quantity}
                    onChange={(e) => setPrice(e.target.value)}
                    min="1"
                    required
                />


                <p>Quantity (in Kg)</p>
                <input
                    
                    type="number"
                    placeholder="Quantity"

                    value={price}

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