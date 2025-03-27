import React, { useEffect, useState } from "react";
import CardFeature from "./CardFeature";

const AllProduct = ({ heading }) => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch latest 5 products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/ecom/products/product/");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch products");
        }

        if (data) {
          // Get latest 5 products
          const latestProducts = data.slice(-5).reverse();
          setProductData(latestProducts);
        } else {
          throw new Error("Invalid data format from server");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>

      {/* Product List */}
      <div className="flex flex-wrap justify-center gap-4 my-4">
        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : productData.length > 0 ? (
          productData.map((el) => (
            <CardFeature
              key={el._id}
              id={el._id}
              image={el.image}
              name={el.name}
              category={el.category}
              price={el.price}
            />
          ))
        ) : (
          <p className="text-center">No products found</p>
        )}
      </div>
    </div>
  );
};

export default AllProduct;
