import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../StoreAssets/Seller.css'

const Seller = ({ onAddProduct }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Fertilizer');
    const [image, setImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = {
            id: Date.now(), // Simple ID generation
            name,
            category,
            image: URL.createObjectURL(image), // Create a URL for the image
            price: 0, // Set a default price or add a price input
            quantity,
            description,
        };
        onAddProduct(product); // Call the function to add the product
        navigate('/store'); // Redirect to the store page
    };

    return (
        <div className="seller-form">

            <h2>Add a New Product</h2>
            <form onSubmit={handleSubmit}>
            <p>Name of the product</p>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
             <p>Select the category</p>    
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Fertilizer">Fertilizer</option>
                    <option value="Tool">Tool</option>
                    <option value="Inorganic Product">Inorganic Product</option>
                    <option value="Organic Product">Organic Product</option>
                </select>
              <p>Upload a image</p>   
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />
                <p>Quantity</p>
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
    );
};

export default Seller;