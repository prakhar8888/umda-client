import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper"; // ✅ Add this

const Cart = () => {
  const { cartItems, dispatch } = useCart();

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const totalAmount = (cartItems || []).reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <PageWrapper> {/* ✅ Wrap everything inside PageWrapper */}
      <motion.div
        className="min-h-screen bg-gradient-to-br from-[#fff7e6] via-[#fdf1f1] to-[#fefae0] py-12 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-center text-[#6a4c93] font-serif mb-10">
          🛍️ Your Cart – UMDA Fashion House
        </h2>

        {(cartItems || []).length === 0 ? (
          <div className="text-center mt-20 text-gray-600">
            <p className="text-xl mb-4 font-medium">
              Looks like your wardrobe is still waiting 😢
            </p>
            <Link
              to="/shop"
              className="inline-block text-white bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-2 rounded-full shadow hover:shadow-lg transition-all duration-300"
            >
              🔍 Explore UMDA Collection
            </Link>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-6">
            {(cartItems || []).map((item) => (
              <motion.div
                key={item._id}
                className="flex items-center bg-white border border-yellow-100 shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={item.image || "https://via.placeholder.com/100"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md border mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#6a4c93] font-serif">
                    {item.name}
                  </h3>
                  <p className="text-gray-700 font-medium">₹{item.price}</p>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="ml-4 bg-red-100 text-red-600 px-3 py-1 text-xs rounded-full hover:bg-red-200 transition"
                >
                  ❌ Remove
                </button>
              </motion.div>
            ))}

            {/* Total + CTA */}
            <motion.div
              className="text-right mt-10 bg-white p-6 rounded-xl shadow-lg border border-yellow-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-xl font-bold text-gray-800 mb-4">
                💰 Total Amount: ₹{totalAmount}
              </p>
              <Link
                to="/checkout"
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full shadow hover:shadow-xl transition-all duration-300"
              >
                ✅ Proceed to Checkout
              </Link>
            </motion.div>
          </div>
        )}
      </motion.div>
    </PageWrapper>
  );
};

export default Cart;
