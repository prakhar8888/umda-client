import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import { getAllProducts } from "../api/productService"; // ✅ Get live data

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

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  return (
    <PageWrapper>
      <div className="bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 py-12 px-4">
        {/* Title */}
        <motion.h2
          className="text-3xl md:text-4xl text-center font-bold text-[#6a4c93] font-serif mb-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🌼 Discover Your Look with UMDA
        </motion.h2>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              className="group bg-white border border-yellow-100 rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 10,
                delay: i * 0.05,
              }}
            >
              <img
                src={cat.image || "/assets/no-image.png"}
                alt={cat.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/no-image.png";
                }}
                className="w-full h-48 object-cover transition-all duration-300 group-hover:brightness-90"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-[#6a4c93] font-serif group-hover:text-purple-600 transition-colors duration-300">
                  {cat.name}
                </h3>
                <Link
                  to="/shop"
                  className="inline-block mt-3 text-sm text-white px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow hover:shadow-lg transition-all duration-300"
                >
                  Explore {cat.name}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center bg-gradient-to-br from-[#fff7e6] via-[#fefae0] to-[#fff0f0] py-10 rounded-xl shadow-inner max-w-5xl mx-auto px-6"
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
            className="inline-block mt-4 text-white px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow hover:shadow-lg transition-all duration-300"
          >
            🛍️ Browse Collection
          </Link>
        </motion.div>

        {/* 🔥 New Arrivals Section */}
        <div className="mt-20 px-4 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#6a4c93] mb-6 text-center font-serif">
            🆕 New Arrivals
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">
                No products found.
              </p>
            ) : (
              products.map((product) => (
                <div
                  key={product._id}
                  className="border shadow-md p-4 rounded-lg transition-transform hover:scale-105 bg-white"
                >
                  <img
                    src={product.image || "/assets/no-image.png"}
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/no-image.png";
                    }}
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-xl font-semibold text-[#6a4c93]">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                  <p className="text-lg font-bold mt-2 text-pink-600">
                    ₹{product.price}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
