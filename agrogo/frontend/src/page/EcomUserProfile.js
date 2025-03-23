import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const EcomUserProfile = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/ecom/products/user/${userId}`);
        setProducts(response.data.data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userId]);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      await axios.delete(`http://localhost:5000/ecom/products/product/delete/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <>
        <Header/>
        <div className="mt-20 max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">My Products</h2>
        {products.length === 0 ? (
            <p className="text-center text-gray-500">No products found</p>
        ) : (
            <ul className="space-y-4">
            {products.map((product) => (
                <li key={product._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">{product.description}</p>
                </div>
                <button 
                    onClick={() => handleDelete(product._id)} 
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    Delete
                </button>
                </li>
            ))}
            </ul>
        )}
        </div>
    </>
  );
};

export default EcomUserProfile;
