import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

function ProductCard({ product }) {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <motion.div
      className="bg-white shadow-md rounded-xl p-4 transition duration-300 border border-yellow-100"
      whileHover={{ scale: 1.03 }}
    >
      <Link to={`/product/${product._id}`}>
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-cover rounded-md"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        />
        <h3 className="text-lg font-semibold mt-3 text-[#6a4c93] font-serif truncate">
          {product.name}
        </h3>
        <p className="text-gray-700 font-medium">₹{product.price}</p>
      </Link>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleAddToCart}
          className="bg-[#6a4c93] text-white px-4 py-1.5 rounded-md shadow hover:bg-[#5a3c83] transition duration-200"
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
