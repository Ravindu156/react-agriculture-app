import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ecom/orders');
        setOrders(response.data);  // Assuming the response contains the orders
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Delete an order
  const handleDelete = async (orderId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/ecom/orders/${orderId}`);
      if (response.status === 200) {
        toast.success("Order deleted successfully");
        setOrders(orders.filter(order => order._id !== orderId));  // Update UI by removing deleted order
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order");
    }
  };

  // Update the order status
  const handleUpdateStatus = async (orderId, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/ecom/orders/status/${orderId}`, { orderStatus: status });
      if (response.status === 200) {
        toast.success("Order status updated");
        // Update the order status in the UI
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, orderStatus: status } : order
        ));
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-lg md:text-2xl font-bold text-slate-600">Admin Orders</h2>
      
      <table className="w-full table-auto mt-4 border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">User</th>
            <th className="border px-4 py-2">Total Price</th>
            <th className="border px-4 py-2">Order Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border px-4 py-2">{order._id}</td>
              <td className="border px-4 py-2">{order.user.firstname} {order.user.lastname}</td>
              <td className="border px-4 py-2">{order.totalPrice}</td>
              <td className="border px-4 py-2">
                <select
                  value={order.orderStatus}
                  onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                  className="bg-white border border-gray-300 rounded px-2 py-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(order._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
