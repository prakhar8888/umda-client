// 📄 ecommerce-client/src/pages/AdminProducts.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

function AdminProducts() {
  const [isAllowed, setIsAllowed] = useState(true);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({});

  // 🔐 Admin login check
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (isLoggedIn !== "true") {
      window.location.href = "/admin/login";
      setIsAllowed(false);
    }
  }, []);

  // 📦 Fetch all products
  useEffect(() => {
    if (isAllowed) fetchProducts();
  }, [isAllowed]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch products:", err);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${BACKEND_URL}/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("❌ Delete failed:", err);
      }
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product._id);
    setForm(product);
  };

  const handleEditChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      await axios.put(`${BACKEND_URL}/api/products/${editingProduct}`, form);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("❌ Update failed:", err);
    }
  };

  if (!isAllowed) return null;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-[#6a4c93]">
        🛠️ Admin Panel: Manage Products
      </h2>

      {products.map((product) => (
        <div
          key={product._id}
          className="border-b py-4 flex justify-between items-start gap-4"
        >
          {/* Edit Mode */}
          {editingProduct === product._id ? (
            <div className="flex flex-col w-full gap-2">
              <input
                name="name"
                value={form.name}
                onChange={handleEditChange}
                placeholder="Product Name"
                className="border p-2 rounded"
              />
              <input
                name="price"
                value={form.price}
                onChange={handleEditChange}
                placeholder="Price"
                className="border p-2 rounded"
              />
              <input
                name="image"
                value={form.image}
                onChange={handleEditChange}
                placeholder="Image URL"
                className="border p-2 rounded"
              />
              <input
                name="category"
                value={form.category}
                onChange={handleEditChange}
                placeholder="Category"
                className="border p-2 rounded"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleEditChange}
                placeholder="Description"
                className="border p-2 rounded"
              />
              <button
                onClick={saveEdit}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save ✅
              </button>
            </div>
          ) : (
            // View Mode
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-700">₹{product.price}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
              <img
                src={product.image}
                alt={product.name}
                className="w-28 mt-2 rounded"
              />
            </div>
          )}

          <div className="space-x-2 flex items-center">
            <button
              onClick={() => startEdit(product)}
              className="text-blue-600 font-semibold"
            >
              Edit ✏️
            </button>
            <button
              onClick={() => deleteProduct(product._id)}
              className="text-red-600 font-semibold"
            >
              Delete ❌
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminProducts;
