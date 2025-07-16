import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper"; // ✅ Add this import

const Checkout = () => {
  const { cartItems } = useCart();
  const totalAmount = (cartItems || []).reduce(
    (total, item) => total + item.price,
    0
  );

  const [shipping, setShipping] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    if (
      shipping.name &&
      shipping.phone &&
      shipping.address &&
      shipping.city &&
      shipping.pincode
    ) {
      alert("🛍️ Razorpay checkout triggered (to be implemented)");
    } else {
      alert("⚠️ Please fill all shipping details.");
    }
  };

  return (
    <PageWrapper> {/* ✅ Wrap entire page in PageWrapper */}
      <motion.div
        className="min-h-screen bg-gradient-to-br from-[#fff7e6] via-[#fdf1f1] to-[#fefae0] py-12 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-[#6a4c93] font-serif mb-10">
          💳 Checkout – UMDA
        </h2>

        {(cartItems || []).length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
        ) : (
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 bg-white p-6 rounded-2xl shadow-lg border border-yellow-100">
            {/* Order Summary */}
            <div>
              <h3 className="text-xl font-semibold text-[#6a4c93] font-serif mb-4">
                🛒 Order Summary
              </h3>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-medium text-[#6a4c93]">{item.name}</p>
                      <p className="text-sm text-gray-600">₹{item.price}</p>
                    </div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-6 text-lg font-bold text-gray-800 text-right">
                Total: ₹{totalAmount}
              </p>
            </div>

            {/* Shipping Form */}
            <div>
              <h3 className="text-xl font-semibold text-[#6a4c93] font-serif mb-4">
                📦 Shipping Details
              </h3>
              <form className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={shipping.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="tel"
                  name="phone"
                  value={shipping.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full p-2 border rounded"
                />
                <textarea
                  name="address"
                  value={shipping.address}
                  onChange={handleChange}
                  placeholder="Full Address"
                  className="w-full p-2 border rounded"
                  rows={3}
                />
                <input
                  type="text"
                  name="city"
                  value={shipping.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="pincode"
                  value={shipping.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  className="w-full p-2 border rounded"
                />
              </form>

              <motion.button
                onClick={handleCheckout}
                className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full shadow hover:shadow-xl transition-all duration-300"
                whileTap={{ scale: 0.96 }}
              >
                🔐 Pay Securely
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </PageWrapper>
  );
};

export default Checkout;
