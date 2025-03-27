import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../components/AllProduct";
import { addCartItem } from '../redux/ProductSlide';

const Menu = () => {
  const { filterby } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch product data from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/ecom/products/product/${filterby}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch product");
        }

        setProduct(data.data);  // Store fetched product
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [filterby]);

  const handleAddCartProduct = () => {
    if (product) {
      dispatch(addCartItem(product));
    }
  };

  const handleBuy = () => {
    if (product) {
      dispatch(addCartItem(product));
      navigate("/ecom/cart");
    }
  };

  // Show loading or error message
  if (loading) return <p className="text-center mt-5">Loading product...</p>;
  if (error) return <p className="text-center text-red-500 mt-5">{error}</p>;

  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl m-auto md:flex bg-white">
        <div className="max-w-sm overflow-hidden w-full p-5">
          <img
            src={product.image}
            alt={product.name}
            className="hover:scale-105 transition-all h-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-slate-600 capitalize text-2xl md:text-4xl">
            {product.name}
          </h3>
          <p className="text-slate-500 font-medium text-2xl">{product.category}</p>
          <p className="font-bold md:text-2xl">
            <span className="text-red-500">Rs.</span>
            <span>{product.price}</span>
          </p>
          <div className="flex gap-3">
            <button onClick={handleBuy} className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]">
              Buy
            </button>
            <button onClick={handleAddCartProduct} className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]">
              Add Cart
            </button>
          </div>
          <div>
            <p className="text-slate-600 font-medium">Description :</p>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      <AllProduct heading={"Related Products"} />
    </div>
  );
};

export default Menu;
