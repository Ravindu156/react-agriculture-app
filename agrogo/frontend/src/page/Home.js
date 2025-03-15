import React, { useEffect, useRef, useState } from "react";
import CardFeature from "../components/CardFeature";
import HomeCard from "../components/HomeCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import FilterProduct from "../components/FilterProduct";
import AllProduct from "../components/AllProduct";
import Header from "../components/Header";
import HomeProductFilter from "../components/HomeProductFilter";

const Home = () => {
  // State to store product data
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/ecom/products/product");
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtered product lists
  const homeProductCartList = productData.slice(1, 5);
  const homeProductCartListVegetables = productData.filter((el) => el.category === "seeds");

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <>
      <Header />
      <div className="p-2 md:p-4">
        <div className="md:flex gap-4 py-2 mt-16">
          <div className="md:w-1/2">
            <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
              <p className="text-sm font-medium text-slate-900">Natural Foods</p>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
                className="h-7"
                alt="Natural Foods"
              />
            </div>
            <h2 className="text-4xl md:text-7xl font-bold py-3">
              Fresh Vegetable From Farmers in <span className="text-red-600">Sri Lanka</span>
            </h2>
            <p className="py-3 text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
              Order Now
            </button>
          </div>

          {/* Display Home Cards */}
          <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
            {loading ? (
              loadingArray.map((_, index) => <HomeCard key={index} loading="Loading..." />)
            ) : (
              homeProductCartList.map((el) => (
                <HomeCard key={el._id} id={el._id} image={el.image} name={el.name} price={el.price} category={el.category} />
              ))
            )}
          </div>
        </div>

        {/* Fresh Vegetables Section */}
        <div>
          <div className="flex w-full items-center">
            <h2 className="font-bold text-2xl text-slate-800 mb-4">Fresh Seeds</h2>
            <div className="ml-auto flex gap-4">
              <button onClick={preveProduct} className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded">
                <GrPrevious />
              </button>
              <button onClick={nextProduct} className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded">
                <GrNext />
              </button>
            </div>
          </div>
          <div className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all" ref={slideProductRef}>
            {loading ? (
              loadingArrayFeature.map((_, index) => <CardFeature key={index} loading="Loading..." />)
            ) : (
              homeProductCartListVegetables.map((el) => (
                <CardFeature key={el._id} id={el._id} name={el.name} category={el.category} price={el.price} image={el.image} />
              ))
            )}
          </div>
        </div>
        
        <HomeProductFilter/>
        {/* All Products Section */}
        <AllProduct heading={"Best Sellers"} />
      </div>
    </>
  );
};

export default Home;
