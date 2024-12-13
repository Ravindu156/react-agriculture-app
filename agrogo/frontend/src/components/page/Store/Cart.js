import React from 'react';
import './StoreAssets/Cart.css'; // Create a CSS file for styling

const Cart = ({ cartItems, onRemoveFromCart }) => {
    // Calculate total value of items in the cart
    const totalValue = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);

    const handleBuy = () => {
        // Implement buy functionality here (e.g., redirect to payment page)
        alert('Proceeding to buy the items in your cart!');
    };

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
                    <div className="cart-total">
                        <h3>Total: ${totalValue}</h3>
                        <button className="buy-button" onClick={handleBuy}>Buy</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;