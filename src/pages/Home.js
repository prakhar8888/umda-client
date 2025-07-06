import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const categories = [
    {
      name: "Kurtis",
      image: "https://i.imgur.com/4DlG0GJ.jpg",
    },
    {
      name: "Sarees",
      image: "https://i.imgur.com/sOdMF0v.jpg",
    },
    {
      name: "Anarkalis",
      image: "https://i.imgur.com/fXRylsl.jpg",
    },
    {
      name: "Bridal Wear",
      image: "https://i.imgur.com/9RpLJfj.jpg",
    },
  ];

  return (
    <div className="bg-[#fffdf6] py-12 px-4">
      <motion.h2
        className="text-3xl md:text-4xl text-center font-bold text-[#6a4c93] font-serif mb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🌼 Discover Your Look with UMDA
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            className="bg-white border border-yellow-100 rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 100, damping: 12, delay: i * 0.05 }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-[#6a4c93] font-serif">
                {cat.name}
              </h3>
              <Link
                to="/shop"
                className="inline-block mt-3 text-sm text-white bg-[#6a4c93] px-4 py-1 rounded hover:bg-[#5a3c83] transition"
              >
                Explore {cat.name}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        className="mt-20 text-center bg-gradient-to-br from-[#fff7e6] via-[#fefae0] to-[#fff0f0] py-10 rounded-xl shadow-inner max-w-5xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h3 className="text-2xl font-semibold text-[#6a4c93] font-serif">
          💫 Elegance That Speaks — Only at UMDA Fashion House
        </h3>
        <p className="text-gray-600 mt-2">
          From festivals to flair-filled Fridays — shop ethnic with swag.
        </p>
        <Link
          to="/shop"
          className="inline-block mt-4 bg-[#6a4c93] text-white px-6 py-2 rounded shadow hover:bg-[#5a3c83] transition duration-300"
        >
          🛍️ Browse Collection
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
