// 📄 frontend/components/AdminAddProduct.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../api/productService";

const AdminAddProduct = () => {
  const navigate = useNavigate();

  // 📝 Form States
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(""); // 🔗 URL only
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // 📤 Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ⚠️ Validation
    if (!name || !price || !category || !image || !description) {
      setError("❌ All fields are required.");
      return;
    }

    const newProduct = {
      name,
      price: Number(price),
      category,
      image,
      description,
    };

    try {
      await addProduct(newProduct);
      alert("✅ Product added successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error("🔥 Error while adding product:", err);
      setError("❌ Failed to add product. Check the backend or try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-purple-800 mb-6">
        ➕ Add New Product
      </h2>

      {error && (
        <p className="text-red-600 text-center font-medium mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded p-2"
        />

        <input
          type="number"
          placeholder="Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border rounded p-2"
        />

        {/* ✅ FIXED Category Selector */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">Select Category</option>
          <option value="Kurta">Kurta</option>
          <option value="Saree">Saree</option>
          <option value="Dupatta">Dupatta</option>
          <option value="Skirt">Skirt</option>
        </select>

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border rounded p-2"
        />

        {/* 🖼️ Live Image Preview */}
        {image && (
          <img
            src={image}
            alt="Preview"
            className="w-32 mt-2 rounded shadow border"
          />
        )}

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded p-2"
          rows={3}
        />

        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
