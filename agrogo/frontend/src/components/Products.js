import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);

  const categories = [
    "Fruits",
    "Vegetable",
    "Icream",
    "Dosa",
    "Pizza",
    "Rice",
    "Cake",
    "Burger",
    "Panner",
    "Sandwich",
  ];

  const priceRanges = [
    { label: "50 - 100", min: 50, max: 100 },
    { label: "100 - 150", min: 100, max: 150 },
    { label: "150 - 200", min: 150, max: 200 },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:5000/ecom/products/product");
      setProducts(response.data);
      setFilteredProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (range) => {
    setSelectedPriceRange((prev) =>
      prev.includes(range)
        ? prev.filter((r) => r !== range)
        : [...prev, range]
    );
  };

  useEffect(() => {
    const filtered = products.filter((product) => {
      const isSearchMatch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const isCategoryMatch =
        selectedCategory.length === 0 ||
        selectedCategory.includes(product.category);
      const isPriceMatch =
        selectedPriceRange.length === 0 ||
        selectedPriceRange.some(
          (range) =>
            parseFloat(product.price) >= range.min &&
            parseFloat(product.price) <= range.max
        );

      return isSearchMatch && isCategoryMatch && isPriceMatch;
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedPriceRange, products]);

  return (
    <div className="flex p-6">
      {/* Sidebar for filters */}
      <div className="w-1/4 pr-4">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />

        {/* Category Filters */}
        <h3 className="font-semibold mb-2">Category</h3>
        <div className="space-y-2 mb-6">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={category}
                checked={selectedCategory.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>

        {/* Price Range Filters */}
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.label} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={range.label}
                checked={selectedPriceRange.includes(range)}
                onChange={() => handlePriceChange(range)}
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="border p-4 rounded shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="font-bold text-lg mb-2">{product.name}</h2>
            <p className="text-gray-600">{product.category}</p>
            <p className="text-gray-800 font-semibold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
