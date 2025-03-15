import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "../components/CardFeature";
import HomeCard from "../components/HomeCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import FilterProduct from "../components/FilterProduct";
import AllProduct from "../components/AllProduct";
import Header from "../components/Header";
import Image from '../assest/fert.jpg';

const Home = () => {
  const productData = useSelector((state) => state.product.productList);

  const categorizedProducts = {
    seeds: productData.filter((el) => el.category === "seeds"),
    fertilizers: productData.filter((el) => el.category === "fertilizers"),
    tools: productData.filter((el) => el.category === "tools"),
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="p-2 md:p-4">
        <div className="md:flex gap-4 py-2 mt-16">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-7xl font-bold py-3">
              Enhance your field with the <br />
              <span className="text-red-600">Best Tools</span>
            </h2>
            <p className="py-3 text-base">
              Welcome to the one-stop shop for all your agricultural needs! Whether you're a seasoned gardener or just starting out, we offer a wide range of high-quality fertilizers, innovative new tools, and premium seeds to help you grow and thrive.
            </p>
            <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
              Order Now
            </button>
          </div>

          <div className="md:w-1/2 bg-cover bg-center relative">
            <img src={Image} alt="Login Background" className="w-full h-full object-cover" />
          </div>
        </div>

         {Object.entries(categorizedProducts).map(([category, products]) => (
          <div key={category} className="mt-8">
            <h2 className="text-2xl font-bold capitalize mb-4">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product._id} className="border p-4 rounded shadow">
                    <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                    <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                    <p className="text-gray-700">{product.description}</p>
                    <p className="font-bold text-green-600">${product.price}</p>
                    <p className="text-gray-500">Quantity: {product.quantity}</p>
                    <p className="text-gray-500">Author: {product.author}</p>
                    <div className="flex justify-between mt-2">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded">Buy Now</button>
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded">Add to Cart</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products available in this category.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;