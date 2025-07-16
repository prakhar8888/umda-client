import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductById,
  addProduct,
  updateProduct,
} from "../api/productService";

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      getProductById(id)
        .then((data) => {
          setForm({
            name: data.name || "",
            price: data.price?.toString() || "",
            category: data.category || "",
            description: data.description || "",
            image: data.image?.url || "", // ← properly extract image URL
          });
        })
        .catch(() => setError("❌ Failed to load product."));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const trimmedForm = {
      ...form,
      name: form.name.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
      price: parseFloat(form.price),
    };

    try {
      // Basic client-side validation
      if (
        !trimmedForm.name ||
        !trimmedForm.category ||
        !trimmedForm.description ||
        !trimmedForm.image ||
        isNaN(trimmedForm.price)
      ) {
        throw new Error("All fields must be filled correctly.");
      }

      if (isEdit) {
        await updateProduct(id, trimmedForm);
      } else {
        await addProduct(trimmedForm);
      }

      navigate("/admin/products");
    } catch (err) {
      console.error("Product submission error:", err);
      setError("❌ Submission failed. Check all fields and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffdf6] py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md border border-yellow-100">
        <h2 className="text-2xl font-bold text-[#6a4c93] font-serif mb-6 text-center">
          {isEdit ? "✏️ Edit Product" : "➕ Add New Product"}
        </h2>

        {error && (
          <div className="text-red-600 text-center mb-4 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="e.g., Red Banarasi Silk Saree"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="e.g., 2499"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="e.g., Saree, Kurta, Bridal, Anarkali"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Image URL</label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Paste image link here"
            />
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="w-32 h-32 mt-3 object-cover rounded border"
              />
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
              rows="4"
              placeholder="Describe the ethnic look, fabric, embroidery, etc."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6a4c93] text-white py-2 rounded hover:bg-[#5a3c83] transition"
          >
            {loading ? "Saving..." : isEdit ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
