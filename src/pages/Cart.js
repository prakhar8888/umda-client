import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, dispatch } = useCart();

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const totalAmount = (cartItems || []).reduce((total, item) => total + item.price, 0);

  return (
    <div className="min-h-screen bg-[#fffdf6] py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-[#6a4c93] font-serif mb-8">
        🛍️ Your Cart
      </h2>

      {(cartItems || []).length === 0 ? (
        <div className="text-center mt-20 text-gray-600">
          <p className="text-xl">Your cart is empty.</p>
          <Link
            to="/shop"
            className="mt-4 inline-block text-white bg-[#6a4c93] px-6 py-2 rounded hover:bg-[#5a3c83] transition"
          >
            Browse Ethnic Collection
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {(cartItems || []).map((item) => (
            <div
              key={item._id}
              className="flex items-center bg-white shadow border border-yellow-100 p-4 rounded-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded mr-4 border"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#6a4c93] font-serif">
                  {item.name}
                </h3>
                <p className="text-gray-700">₹{item.price}</p>
              </div>
              <button
                onClick={() => handleRemove(item._id)}
                className="ml-4 bg-red-100 text-red-600 px-3 py-1 text-xs rounded hover:bg-red-200"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-xl font-bold text-gray-800">
              Total: ₹{totalAmount}
            </p>
            <Link
              to="/checkout"
              className="mt-3 inline-block bg-[#6a4c93] text-white px-6 py-2 rounded hover:bg-[#5a3c83] transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
