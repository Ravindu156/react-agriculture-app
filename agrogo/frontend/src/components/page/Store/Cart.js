import React from 'react';
import './StoreAssets/Cart.css'; // Create a CSS file for styling

const Cart = ({ cartItems, onRemoveFromCart }) => {
    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <p>Price: ${item.price}</p>
                                <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;