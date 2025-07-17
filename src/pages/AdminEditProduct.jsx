// 📄 frontend/pages/AdminEditProduct.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

const CATEGORY_OPTIONS = ["Kurta", "Saree", "Dupatta", "Skirt"];

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/products/${id}`);
        const product = res.data;

        setName(product.name);
        setPrice(product.price);

        // ✅ Only keep allowed category — else empty
        if (CATEGORY_OPTIONS.includes(product.category)) {
          setCategory(product.category);
        } else {
          setCategory(""); // force re-pick
        }

        setImage(product.image);
        setDescription(product.description);
      } catch (err) {
        console.error("❌ Failed to load product:", err);
        setError("❌ Failed to load product.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name || !price || !category || !image || !description) {
      setError("❌ All fields are required.");
      return;
    }
    try {
      await axios.put(`${BACKEND_URL}/api/products/${id}`, {
        name,
        price: Number(price),
        category,
        image,
        description,
      });
      alert("✅ Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error("❌ Failed to update product:", err);
      setError("❌ Failed to update product.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-purple-800 mb-6">
        📝 Edit Product
      </h2>

      {error && (
        <p className="text-red-600 text-center font-medium mb-4">{error}</p>
      )}

      <form onSubmit={handleUpdate} className="space-y-4">
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

        {/* ✅ Fixed Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">Select Category</option>
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border rounded p-2"
        />

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
          Update Product
        </button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
