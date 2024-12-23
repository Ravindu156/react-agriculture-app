import React from 'react';
import '../StoreAssets/ProductCard.css'; 

const AgroCard = ({ product, onSelect  }) => {
    return (
        <div className="agro-card" onClick={onSelect} style={{ cursor: 'pointer' }}>
          
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price}</p>
           
              
        </div>
    );
};

export default AgroCard;
