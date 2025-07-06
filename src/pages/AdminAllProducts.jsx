import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { motion } from "framer-motion";

const AdminAllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("❌ Failed to load products:", err));
  }, []);

  return (
    <motion.div
      className="p-6 min-h-screen bg-[#fffdf6]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-[#6a4c93] font-serif">
        🧾 UMDA Inventory – Read Only ({products.length} Products)
      </h1>

      <div className="overflow-x-auto shadow-md rounded-lg border border-yellow-100 bg-white">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-[#fefae0] text-[#6a4c93] uppercase font-semibold">
            <tr>
              <th className="text-left py-3 px-4">Image</th>
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Price</th>
              <th className="text-left py-3 px-4">Category</th>
              <th className="text-left py-3 px-4">Description</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  😕 No products found.
                </td>
              </tr>
            )}

            {products.map((product) => (
              <tr
                key={product._id}
                className="border-t hover:bg-[#fff7e6] transition duration-200"
              >
                <td className="py-3 px-4">
                  <img
                    src={product.image?.url || "https://via.placeholder.com/100"}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded border"
                  />
                </td>
                <td className="py-3 px-4 font-medium text-gray-800">
                  {product.name}
                </td>
                <td className="py-3 px-4 text-green-600 font-semibold">
                  ₹{product.price}
                </td>
                <td className="py-3 px-4 text-gray-700">{product.category}</td>
                <td className="py-3 px-4 text-gray-600">{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AdminAllProducts;
