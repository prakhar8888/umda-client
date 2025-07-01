import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

function AdminProductForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // if exists, we're editing
  const [isAllowed, setIsAllowed] = useState(true);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (isLoggedIn !== "true") {
      setIsAllowed(false);
      window.location.href = "/admin/login";
    }
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`${BACKEND_URL}/api/products/${id}`)
        .then((res) => setForm(res.data))
        .catch((err) => console.error("❌ Failed to fetch product:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await axios.put(`${BACKEND_URL}/api/products/${id}`, form);
        alert("✅ Product updated!");
      } else {
        await axios.post(`${BACKEND_URL}/api/products`, form);
        alert("✅ New product added!");
      }

      navigate("/admin/products");
    } catch (err) {
      console.error("❌ Submission failed:", err);
      alert("❌ Error occurred.");
    }
  };

  if (!isAllowed) return null;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6 text-[#6a4c93] text-center">
        {id ? "✏️ Edit Product" : "➕ Add New Product"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="price"
          value={form.price}
          type="number"
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category (e.g. Saree, Kurta)"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          rows={4}
        ></textarea>

        <button
          type="submit"
          className="w-full bg-[#6a4c93] text-white py-2 rounded hover:bg-[#5a3c83]"
        >
          {id ? "Update Product ✅" : "Add Product ✅"}
        </button>
      </form>
    </div>
  );
}

export default AdminProductForm;
