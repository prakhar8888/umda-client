import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#fdf0e5] to-[#fff7e6] border-t border-yellow-200 mt-20 py-10 text-sm text-gray-700">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold text-[#6a4c93] font-serif mb-2">
            👗 UMDA Fashion House
          </h2>
          <p>
            Redefining elegance from the heart of Lucknow 🕌. Wear the vibe,
            flaunt the culture 💫
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#6a4c93] mb-2">
            🔗 Quick Links
          </h3>
          <ul className="space-y-1">
            <li>
              <NavLink to="/" className="hover:text-[#8e44ad] transition">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" className="hover:text-[#8e44ad] transition">
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="hover:text-[#8e44ad] transition">
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/products" className="hover:text-[#8e44ad] transition">
                Admin
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#6a4c93] mb-2">
            📍 Contact
          </h3>
          <ul className="space-y-1">
            <li>📌 Lucknow, Uttar Pradesh, India</li>
            <li>📧 prakhargupta.4299@gmail.com</li>
            <li>📞 +91 8707748399</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-10">
        © {new Date().getFullYear()} UMDA Fashion House. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
