// 📄 frontend/pages/Shop.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { BACKEND_URL } from "../config";
import PageWrapper from "../components/PageWrapper";

const categories = ["All", "Kurta", "Saree", "Dupatta", "Skirt"];
const sortOptions = ["None", "Low to High", "High to Low"];

function Shop() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("None");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const encodedKeyword = encodeURIComponent(keyword);
        const res = await axios.get(`${BACKEND_URL}/api/products?keyword=${encodedKeyword}`);
        let data = res.data;

        // ✅ Proper category filter using item.category
        if (category !== "All") {
          data = data.filter((item) =>
            item.category && item.category.toLowerCase() === category.toLowerCase()
          );
        }

        if (sort === "Low to High") {
          data.sort((a, b) => a.price - b.price);
        } else if (sort === "High to Low") {
          data.sort((a, b) => b.price - a.price);
        }

        setProducts(data);
      } catch (error) {
        console.error("❌ Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, [keyword, category, sort]);

  return (
    <PageWrapper>
      <div className="p-6 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 min-h-screen">
        {/* Page Title */}
        <h2 className="text-3xl font-bold text-center text-[#6a4c93] mb-6 font-serif">
          ✨ Shop Our Ethnic Collection
        </h2>

        {/* Search Input */}
        <div className="max-w-md mx-auto mb-6">
          <input
            type="text"
            placeholder="Search ethnic wear..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full p-2 border border-purple-200 rounded shadow-sm focus:ring-2 focus:ring-purple-400 transition"
          />
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1 rounded-full border text-sm font-medium transition duration-200 ${
                category === cat
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow"
                  : "border-gray-400 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="text-center mb-6">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-purple-300 transition"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

export default Shop;
