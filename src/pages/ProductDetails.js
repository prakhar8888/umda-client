import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";

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

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600 animate-pulse">
        ⏳ Loading product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500 font-bold">{error}</div>
    );
  }

  return (
    <PageWrapper>
      <motion.div
        className="bg-gradient-to-br from-[#fff7e6] via-[#fdf1f1] to-[#fefae0] min-h-screen py-12 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-10 p-6 md:p-10">
          {/* Product Image */}
          <motion.div
            className="w-full h-[400px] rounded-xl overflow-hidden shadow"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <img
              src={
                product.image?.url ||
                product.image || // Fallback to plain string URL if not stored as object
                "https://via.placeholder.com/500"
              }
              alt={product.name}
              className="w-full h-full object-cover hover:brightness-90 transition-all duration-300"
            />
          </motion.div>

          {/* Product Info */}
          <div>
            <motion.h2
              className="text-3xl font-bold text-[#6a4c93] font-serif mb-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {product.name}
            </motion.h2>

            <p className="text-xl text-gray-800 mb-3 font-medium">
              ₹{product.price}
            </p>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description ||
                "This handcrafted piece reflects the timeless grace of Indian ethnic fashion. Perfect for any occasion — from festivals to weddings."}
            </p>

            <motion.button
              onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-xl transition-all duration-300"
              whileTap={{ scale: 0.95 }}
            >
              🛒 Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>
    </PageWrapper>
  );
}

export default ProductDetails;
