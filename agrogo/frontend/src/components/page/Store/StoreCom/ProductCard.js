import React from 'react';

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    // Logic to add product to cart
    console.log(`Added ${product.name} to cart`);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;