import React from 'react';
import '../StoreAssets/ProductCard.css'; 

const AgroCard = ({ product, onAddToCart  }) => {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price}</p>
            <button className="add-to-cart-button" onClick={() => onAddToCart(product)}>
                Select
            </button>
        </div>
    );
};

export default AgroCard;