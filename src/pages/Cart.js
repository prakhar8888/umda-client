import React, { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { BACKEND_URL } from "../config";

function Cart() {
  const { state, dispatch } = useCart();
  const cartItems = state?.cartItems || [];

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
  });

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/orders`, {
        ...form,
        items: cartItems,
        totalAmount,
      });
      dispatch({ type: "CLEAR_CART" });
      alert("✅ Order placed successfully!");
    } catch (err) {
      console.error("❌ Checkout failed:", err);
      alert("❌ Something went wrong during checkout.");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
        🛒 Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-4 space-y-3">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2 text-gray-800"
              >
                <span>
                  {item.name} × {item.quantity || 1}
                </span>
                <span>₹{item.price}</span>
              </li>
            ))}
          </ul>

          <p className="text-right font-semibold text-lg mb-4 text-indigo-800">
            Total: ₹{totalAmount}
          </p>

          <div className="grid gap-3 mb-6">
            <input
              type="text"
              name="customerName"
              placeholder="Your Name"
              value={form.customerName}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          <button
            onClick={handleCheckout}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition duration-200"
          >
            Place Order ✅
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
