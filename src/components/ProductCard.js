import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { Heart } from "lucide-react"; // For wishlist icon

function ProductCard({ product }) {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <motion.div
      className="group relative bg-white shadow-md rounded-xl p-4 transition duration-300 border border-yellow-100 hover:shadow-xl hover:scale-105"
      whileHover={{ scale: 1.05 }}
    >
      {/* 💖 Wishlist Icon */}
      <div className="absolute top-3 right-3 z-10">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white p-1 rounded-full shadow hover:bg-pink-100 cursor-pointer">
          <Heart className="w-5 h-5 text-pink-500" />
        </div>
      </div>

      {/* 🖼 Product Image with Fallback */}
      <Link to={`/product/${product._id}`}>
        <motion.img
          src={product.image || "/assets/no-image.png"}
          alt={product.name || "Product Image"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/no-image.png";
          }}
          className="w-full h-60 object-cover rounded-md transition duration-300 group-hover:brightness-90"
          whileHover={{ scale: 1.01 }}
        />
        <h3 className="text-lg font-semibold mt-3 text-[#6a4c93] font-serif truncate group-hover:text-purple-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-700 font-medium">₹{product.price}</p>
      </Link>

      {/* 🛒 Action Buttons */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleAddToCart}
          className="px-4 py-1.5 rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow hover:shadow-lg transition-all duration-300"
        >
          🛒 Add to Cart
        </button>

        <Link to={`/product/${product._id}`}>
          <button className="text-sm text-blue-600 hover:underline">
            View Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

export default ProductCard;
