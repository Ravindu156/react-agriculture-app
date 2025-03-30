import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ecom/products/product');
        setProducts(response.data);  // Assuming the response data contains an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  // Delete product by id
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/ecom/products/product/delete/${id}`);
      if (response.status === 200) {
        toast.success("Product deleted successfully");
        // Refresh the product list after deletion
        setProducts(products.filter(product => product._id !== id));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-lg md:text-2xl font-bold text-slate-600">All Products</h2>
      <table className="w-full table-auto mt-4 border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Product ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Quantity</th>
            {/* <th className="border px-4 py-2">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border px-4 py-2">{product._id}</td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.category}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">{product.quantity}</td>
              {/* {<td className="border px-4 py-2">
                { <button
                  onClick={() => handleDelete(product._id)}
                  className="text-white bg-red-500 hover:bg-red-600 py-1 px-4 rounded"
                >
                  Delete
                </button> }
              </td> } */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
