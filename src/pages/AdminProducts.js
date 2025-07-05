import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllProducts,
  deleteProduct,
} from "../api/productService";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      setError("Failed to load products.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error("❌ Error deleting product:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading)
    return <div className="p-10 text-center text-gray-600">Loading products...</div>;

  if (error)
    return <div className="p-10 text-center text-red-600">{error}</div>;

  return (
    <div className="p-6 md:p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#6a4c93]">📦 Products</h1>
        <Link
          to="/admin/products/new"
          className="bg-[#6a4c93] text-white px-4 py-2 rounded"
        >
          ➕ Add New Product
        </Link>
      </div>
      <div className="overflow-x-auto shadow rounded bg-white">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-[#f3e8ff] text-gray-700">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod._id} className="border-t">
                <td className="px-4 py-3">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3">{prod.name}</td>
                <td className="px-4 py-3">₹{prod.price}</td>
                <td className="px-4 py-3">{prod.category}</td>
                <td className="px-4 py-3 space-x-2">
                  <Link
                    to={`/admin/products/edit/${prod._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(prod._id)}
                    className="text-red-600 hover:underline"
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td className="p-4 text-center text-gray-400" colSpan={5}>
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProducts;
