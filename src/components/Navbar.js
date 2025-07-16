import React from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { cartItems } = useCart();
  const isAdmin = localStorage.getItem("adminLoggedIn") === "true";

  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "text-[#6a4c93] font-bold"
      : "hover:text-[#8e44ad] transition duration-200";

  return (
    <motion.header
      className="bg-[#fff7e6] shadow-md fixed w-full top-0 z-50 border-b border-yellow-200"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink
          to="/"
          className="text-2xl font-extrabold text-[#6a4c93] font-serif tracking-wide hover:text-[#8e44ad] transition"
        >
          ✨ UMDA Fashion House
        </NavLink>

        <nav className="flex space-x-6 text-sm font-medium items-center">
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/shop" className={navLinkClasses}>
            Shop
          </NavLink>
          <NavLink to="/cart" className={navLinkClasses}>
            Cart 🛒
            <span className="ml-1 text-xs bg-[#6a4c93] text-white px-2 py-0.5 rounded-full">
              {(cartItems || []).length}
            </span>
          </NavLink>

          {isAdmin && (
            <>
              <NavLink to="/admin/products" className={navLinkClasses}>
                Admin
              </NavLink>
              <NavLink to="/admin/orders" className={navLinkClasses}>
                Orders
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
};

export default Navbar;
