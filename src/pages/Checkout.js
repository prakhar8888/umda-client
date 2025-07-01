import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout() {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const totalAmount = state.cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handlePayment = async () => {
    const { name, address, phone } = userData;
    if (!name || !address || !phone) {
      alert("❌ Please fill in all required details.");
      return;
    }

    try {
      // 1️⃣ Create order on backend
      const { data } = await axios.post("http://localhost:5000/api/payment/create-order", {
        amount: totalAmount,
      });

      // 2️⃣ Razorpay Config
      const options = {
        key: "rzp_test_8zuh5Jpv2BDIjf", // 🔑 your test key
        amount: data.amount,
        currency: data.currency,
        name: "Umda Ethnic",
        description: "Checkout Payment",
        order_id: data.id,
        handler: async function (response) {
          const paymentId = response.razorpay_payment_id;

          // 3️⃣ Save order to DB
          await axios.post("http://localhost:5000/api/orders", {
            customerName: name,
            email: "prakhar@email.com", // 👈 add email if you have it
            phone,
            address,
            items: state.cartItems,
            totalAmount,
            isPaid: true,
            paymentId,
          });

          dispatch({ type: "CLEAR_CART" });
          alert("✅ Payment successful & order placed!");
          navigate("/");
        },
        prefill: {
          name,
          contact: phone,
          email: "prakhar@email.com", // optional
        },
        theme: {
          color: "#6a4c93",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("❌ Razorpay Error:", err);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf0] px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-[#6a4c93] font-serif mb-8">
        🧾 Checkout Summary
      </h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* 🛒 Cart Items Summary */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Items:</h2>
          <ul className="space-y-3">
            {state.cartItems.map((item) => (
              <li
                key={item._id}
                className="flex justify-between bg-white p-4 rounded shadow text-gray-800"
              >
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right font-bold text-lg text-[#6a4c93]">
            Total: ₹{totalAmount}
          </div>
        </div>

        {/* 📋 User Input Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Details:</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6a4c93]"
            />
            <input
              type="text"
              name="address"
              placeholder="Shipping Address"
              value={userData.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6a4c93]"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={userData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6a4c93]"
            />

            <button
              onClick={handlePayment}
              className="w-full bg-[#6a4c93] hover:bg-[#593a82] text-white font-semibold py-3 rounded shadow transition duration-200"
            >
              💳 Pay ₹{totalAmount} Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
