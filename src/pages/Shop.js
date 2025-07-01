import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { BACKEND_URL } from "../config";

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
        let url = `${BACKEND_URL}/api/products?keyword=${encodedKeyword}`;
        const res = await axios.get(url);
        let data = res.data;

        if (category !== "All") {
          data = data.filter((item) =>
            item.name.toLowerCase().includes(category.toLowerCase())
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
    <div className="p-6 bg-[#fefae0] min-h-screen">
      <h2 className="text-3xl font-bold text-center text-[#6a4c93] mb-6 font-serif">
        ✨ Shop Our Ethnic Collection
      </h2>

      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search ethnic wear..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1 rounded-full border text-sm transition duration-150 ${
              category === cat
                ? "bg-[#6a4c93] text-white"
                : "border-gray-400 text-gray-700 hover:bg-[#ececec]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="text-center mb-6">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default Shop;
