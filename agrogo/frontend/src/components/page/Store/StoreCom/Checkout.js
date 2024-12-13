import React from 'react';

const Checkout = ({ cartItems }) => {
  const handleCheckout = () => {
    // Logic for processing the checkout
    console.log('Checkout process initiated');
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default Checkout;