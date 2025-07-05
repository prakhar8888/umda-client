import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-[#fff9f2] via-[#fdf0e5] to-[#fefae0] text-center py-20 px-6 mt-16 shadow-inner border-b border-yellow-200">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#6a4c93] mb-4 font-serif drop-shadow-md">
        ✨ Celebrate Indian Elegance ✨
      </h1>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        Explore timeless ethnic fashion — handcrafted with love, rooted in tradition, designed for the modern you.
      </p>
      <Link
        to="/shop"
        className="inline-block bg-[#6a4c93] text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-lg hover:bg-[#5a3c83] transition duration-200"
      >
        🛍️ Shop Now
      </Link>
    </div>
  );
};

export default Hero;
