import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.section
      className="bg-gradient-to-r from-[#fff9f2] via-[#fdf0e5] to-[#fefae0] text-center py-24 px-6 mt-16 shadow-inner border-b border-yellow-200"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Headline */}
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-[#6a4c93] font-serif drop-shadow-md tracking-wide"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        👑 UMDA Fashion House
      </motion.h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-gray-700 mt-4 mb-8 max-w-2xl mx-auto leading-relaxed">
        Where tradition meets trend — handcrafted styles from Lucknow that drape elegance with every thread. 🌸✨
      </p>

      {/* CTA Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block"
      >
        <Link
          to="/shop"
          className="bg-[#6a4c93] text-white px-8 py-3 rounded-lg text-base font-semibold shadow-lg hover:bg-[#5a3c83] transition duration-300"
        >
          🛍️ Explore Collection
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
