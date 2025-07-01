// 📄 ecommerce-client/src/components/ProductCard.js

import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { state, dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition duration-300">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-cover rounded"
        />
        <h3 className="text-lg font-semibold mt-3 text-[#6a4c93]">
          {product.name}
        </h3>
        <p className="text-gray-600">₹{product.price}</p>
      </Link>

      <div className="flex justify-between items-center mt-3">
        <button
          onClick={handleAddToCart}
          className="bg-[#6a4c93] text-white px-4 py-1 rounded hover:bg-[#593a82]"
        >
          🛒 Add to Cart
        </button>

        <Link to={`/product/${product._id}`}>
          <button className="text-sm text-blue-600 hover:underline">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
