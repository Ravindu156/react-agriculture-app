import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../components/cartProduct";
import emptyCartImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user); // Get user data from Redux
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem('user')); // Parse user data from localStorage
  const userID = userData ? userData.id : null; // Extract user ID

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
  
    if (token) {
      if (userID) {
        // Send the order details through state in navigate
        navigate(`/ecom/orders/${userID}`, {
          state: {
            cartItems: productCartItem,
            totalPrice: totalPrice,
            totalQty: totalQty
          }
        });
      } else {
        toast("User ID not found.");
      }
    } else {
      toast("You have not logged in!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  return (
    <>
      <Header />
      <div className="p-2 md:p-6">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Your Cart Items
        </h2>

        {productCartItem[0] ? (
          <div className="my-4 flex gap-3">
            {/* Display cart items */}
            <div className="w-full max-w-3xl">
              {productCartItem.map((el) => {
                return (
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    category={el.category}
                    qty={el.qty}
                    total={el.total}
                    price={el.price}
                  />
                );
              })}
            </div>

            {/* Total cart item summary */}
            <div className="w-full max-w-md ml-auto">
              <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Qty :</p>
                <p className="ml-auto w-32 font-bold">{totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Price</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-red-500">Rs.</span> {totalPrice}
                </p>
              </div>
              <button
                className="mt-5 bg-red-500 hover:bg-red-600 text-white text-lg font-semibold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 active:scale-95"
                onClick={handlePayment}
              >
                CheckOut
              </button>
            </div>
          </div>
        ) : (
          <div className="flex w-full justify-center items-center flex-col">
            <img src={emptyCartImage} className="w-full max-w-sm" />
            <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;