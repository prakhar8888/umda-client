import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { dispatch } = useCart();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/products/${id}`)
      .then((res) => {
        if (!res.data || !res.data.name) {
          setError("🚨 Product not found.");
        } else {
          setProduct(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch product:", err);
        setError("⚠️ Network error. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="p-10 text-center text-gray-600 animate-pulse">
        ⏳ Loading product...
      </div>
    );

  if (error)
    return (
      <div className="p-10 text-center text-red-500 font-bold">
        {error}
      </div>
    );

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto bg-white rounded-lg shadow-lg transition-all">
      <img
        src={product.image || "https://via.placeholder.com/500"}
        alt={product.name || "Product"}
        className="w-full h-96 object-cover rounded-md mb-6"
      />
      <h2 className="text-4xl font-bold mb-2 text-[#6a4c93] font-serif">
        {product.name}
      </h2>
      <p className="text-xl text-gray-800 mb-4 font-medium">
        ₹{product.price || "N/A"}
      </p>
      <p className="text-gray-700 text-md leading-relaxed mb-4">
        {product.description ||
          "This handcrafted piece reflects the timeless grace of Indian ethnic fashion."}
      </p>
      <button
        onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
        className="mt-6 bg-[#6a4c93] text-white px-6 py-2 rounded hover:bg-[#5a3c83] transition duration-200"
      >
        🛒 Add to Cart
      </button>
    </div>
  );
}

export default ProductDetails;
