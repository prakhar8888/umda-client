import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { cartItems } = useCart();
  const isAdmin = localStorage.getItem("adminLoggedIn") === "true";

  return (
    <motion.header
      className="bg-[#fff7e6] shadow-md fixed w-full top-0 z-50 border-b border-yellow-200"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* 🧵 Brand Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-[#6a4c93] font-serif tracking-wide hover:text-[#8e44ad] transition duration-300 ease-in-out"
        >
          ✨ UMDA Fashion House
        </Link>

        {/* 🚀 Navigation Links */}
        <nav className="flex space-x-6 text-sm font-medium items-center">
          <Link to="/" className="hover:text-[#8e44ad] transition duration-200">
            Home
          </Link>
          <Link to="/shop" className="hover:text-[#8e44ad] transition duration-200">
            Shop
          </Link>
          <Link to="/cart" className="hover:text-[#8e44ad] transition duration-200 relative">
            Cart 🛒
            <span className="ml-1 text-xs bg-[#6a4c93] text-white px-2 py-0.5 rounded-full">
              {(cartItems || []).length}
            </span>
          </Link>

          {/* 🔐 Admin Navigation */}
          {isAdmin && (
            <>
              <Link to="/admin/products" className="hover:text-[#8e44ad] transition duration-200">
                Admin
              </Link>
              <Link to="/admin/orders" className="hover:text-[#8e44ad] transition duration-200">
                Orders
              </Link>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
};

export default Navbar;
