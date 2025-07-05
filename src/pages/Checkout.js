import React from "react";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cartItems } = useCart();
  const totalAmount = (cartItems || []).reduce((total, item) => total + item.price, 0);

  const handleCheckout = () => {
    alert("🛍️ Razorpay checkout triggered (to be implemented)");
  };

  return (
    <div className="min-h-screen bg-[#fffdf6] py-12 px-6">
      <h2 className="text-3xl font-bold text-center text-[#6a4c93] font-serif mb-8">
        💳 Checkout
      </h2>

      {(cartItems || []).length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white border border-yellow-100 shadow-md p-6 rounded-lg space-y-4">
          {(cartItems || []).map((item) => (
            <div key={item._id} className="flex justify-between items-center border-b pb-2">
              <div>
                <h3 className="text-md font-semibold text-[#6a4c93] font-serif">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm">₹{item.price}</p>
              </div>
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 object-cover rounded"
              />
            </div>
          ))}

          <div className="text-right pt-4 border-t">
            <p className="text-lg font-bold text-gray-800">Total: ₹{totalAmount}</p>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-[#6a4c93] text-white px-6 py-2 rounded hover:bg-[#5a3c83] transition"
            >
              🛒 Pay Securely
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
