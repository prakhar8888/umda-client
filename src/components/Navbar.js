import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const isAdmin = localStorage.getItem("adminLoggedIn") === "true";

  return (
    <header className="bg-[#fff7e6] shadow-md fixed w-full top-0 z-50 border-b border-yellow-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-[#6a4c93] font-serif tracking-wide"
        >
          🧵 Ethnic Threads
        </Link>

        {/* Navigation */}
        <nav className="flex space-x-6 text-sm font-medium items-center">
          <Link to="/" className="hover:text-[#8e44ad] transition">Home</Link>
          <Link to="/shop" className="hover:text-[#8e44ad] transition">Shop</Link>
          <Link to="/cart" className="hover:text-[#8e44ad] transition relative">
            Cart 🛒
            <span className="ml-1 text-xs bg-[#6a4c93] text-white px-2 py-0.5 rounded-full">
              {(cartItems || []).length}
            </span>
          </Link>

          {isAdmin && (
            <>
              <Link to="/admin/products" className="hover:text-[#8e44ad] transition">
                Admin
              </Link>
              <Link to="/admin/orders" className="hover:text-[#8e44ad] transition">
                Orders
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
