import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

const AdminAllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-[#6a4c93]">
        🛍️ All Products (Read Only)
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-2 px-4">Image</th>
              <th className="text-left py-2 px-4">Name</th>
              <th className="text-left py-2 px-4">Price</th>
              <th className="text-left py-2 px-4">Category</th>
              <th className="text-left py-2 px-4">Description</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4 font-medium">{product.name}</td>
                <td className="py-2 px-4">₹{product.price}</td>
                <td className="py-2 px-4">{product.category}</td>
                <td className="py-2 px-4">{product.description}</td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-8">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllProducts;
