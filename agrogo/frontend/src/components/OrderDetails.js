import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { useLocation } from "react-router-dom";

const OrderDetails = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { userid } = useParams(); // Extract userid from the URL params

  const [orderDetails, setOrderDetails] = useState({
    shippingAddress: "",
    paymentMethod: "Credit Card",
  });

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate the total price
    const total = productCartItem.reduce((acc, curr) => acc + parseInt(curr.total), 0);
    setTotalPrice(total);
  }, [productCartItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast("Please login to complete your order.");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }

    try {
      const orderData = {
        user: userid, // Use the userid from the URL parameter
        products: productCartItem.map((item) => ({
          product: item._id,
          quantity: item.qty,
          price: item.price,
        })),
        totalPrice: totalPrice,
        shippingAddress: orderDetails.shippingAddress,
        paymentMethod: orderDetails.paymentMethod,
      };

      // Sending the order data to the backend
      const response = await axios.post("http://localhost:5000/ecom/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        toast.success("Order placed successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error placing order:", error.message);
      toast.error("Failed to place the order. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="p-4 md:p-6">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">Order Details</h2>

        <form onSubmit={handleSubmit} className="mt-4">
          {/* Shipping Address */}
          <div className="mb-4">
            <label htmlFor="shippingAddress" className="block text-lg font-semibold">
              Shipping Address
            </label>
            <textarea
              name="shippingAddress"
              value={orderDetails.shippingAddress}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 mt-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block text-lg font-semibold">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={orderDetails.paymentMethod}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded"
              required
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          {/* Order Summary Table */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <table className="w-full table-auto border-collapse mt-4">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Product ID</th>
                  <th className="border px-4 py-2">Product Name</th>
                  <th className="border px-4 py-2">Product Quantity</th>
                  <th className="border px-4 py-2">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {productCartItem.map((item) => (
                  <tr key={item._id}>
                    <td className="border px-4 py-2">{item._id}</td>
                    <td className="border px-4 py-2">{item.name}</td>
                    <td className="border px-4 py-2">{item.qty}</td>
                    <td className="border px-4 py-2">
                      <span className="text-red-500">Rs. </span>
                      {item.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total Summary */}
            <div className="flex justify-between py-2 mt-4 text-lg border-t">
              <p>Total Qty:</p>
              <p>{productCartItem.reduce((acc, curr) => acc + parseInt(curr.qty), 0)}</p>
            </div>
            <div className="flex justify-between py-2 text-lg">
              <p>Total Price:</p>
              <p>
                <span className="text-red-500">Rs. </span>
                {totalPrice}
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-3 text-lg font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 border-2 border-blue-700"
          >
            Place Order
          </button>
        </form>
      </div>
    </>
  );
};

export default OrderDetails;
