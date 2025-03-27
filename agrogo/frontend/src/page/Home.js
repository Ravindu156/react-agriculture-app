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

  // Reference for the filter section
  const filterSectionRef = useRef(null);

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

  // Handle the "Order Now" button click to scroll smoothly to the filter section
  const scrollToFilter = () => {
    filterSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <div className="p-2 md:p-4">
        <div className="md:flex gap-4 py-2 mt-16">
          <div className="md:w-1/2">
            <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            </div>
            <h2 className="text-4xl md:text-7xl font-bold py-3">
            Planting the seeds of a brighter <span className="text-red-600">Future</span>
            </h2>
          
            <p class="py-6 text-lg text-gray-700 leading-relaxed">
  At AgroGo, we’re passionate about helping gardeners of all levels grow thriving, sustainable gardens. Our seeds are carefully selected, tested, and packed with care to ensure your gardening success.
</p>

<div class="mt-6">
  <h3 class="text-2xl font-semibold text-green-800 mb-4">Why Choose Us?</h3>
  <ul class="space-y-4">
    <li class="flex items-start">
      <span class="text-2xl mr-3">🌿</span>
      <span class="text-gray-700">
        <strong class="font-semibold text-green-800">100% Non-GMO:</strong> Naturally grown, always.
      </span>
    </li>
    <li class="flex items-start">
      <span class="text-2xl mr-3">🌎</span>
      <span class="text-gray-700">
        <strong class="font-semibold text-green-800">Eco-Friendly Packaging:</strong> Better for you and the planet.
      </span>
    </li>
    <li class="flex items-start">
      <span class="text-2xl mr-3">🌟</span>
      <span class="text-gray-700">
        <strong class="font-semibold text-green-800">Guaranteed Germination:</strong> Grow with confidence.
      </span>
    </li>
  </ul>
</div>
            <button
              onClick={scrollToFilter}  // Add this function to the "Order Now" button
              className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md"
            >
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
        <div className="filter" ref={filterSectionRef}> {/* Add the ref here */}
          <HomeProductFilter />
        </div>
        {/* All Products Section */}
        <AllProduct heading={"Best Sellers"} />
      </div>
    </>
  );
};

export default Home;
