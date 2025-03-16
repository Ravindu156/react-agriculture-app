import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Import the Link component from react-router-dom

const HomeProductFilter = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ecom/products/product'); // Adjust the endpoint as necessary
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category
  const filterProductsByCategory = (category) => {
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center mb-6">
        <button
          onClick={() => filterProductsByCategory('seeds')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mx-2"
        >
          Seeds
        </button>
        <button
          onClick={() => filterProductsByCategory('fertilizers')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mx-2"
        >
          Fertilizer
        </button>
        <button
          onClick={() => filterProductsByCategory('tools')}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mx-2"
        >
          Tools
        </button>
        <button
          onClick={() => filterProductsByCategory('All')}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mx-2"
        >
          All Products
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {filteredProducts.map(product => (
          <Link 
            key={product._id} 
            to={`/menu/${product._id}`} // Navigate to /menu/:id when clicked
            className="border rounded-lg p-4 shadow-lg block hover:shadow-xl transition-all"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-green-600">Rs.{product.price}</span>
              <span className="text-sm text-gray-500">In stock: {product.quantity}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeProductFilter;
