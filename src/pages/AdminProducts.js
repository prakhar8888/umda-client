import React, { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../api/productService";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const loadProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("❌ Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    }
  };

  return (
    <div className="p-6 bg-[#fffdf6] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#6a4c93] font-serif">
          📋 Admin - Product List
        </h1>
        <button
          className="bg-[#6a4c93] text-white px-4 py-2 rounded shadow hover:bg-[#5a3c83] transition"
          onClick={() => navigate("/admin/products/new")}
        >
          ➕ Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg border border-yellow-100">
          <thead className="bg-[#fdf0e5] text-[#6a4c93] font-semibold text-left">
            <tr>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t hover:bg-gray-50 text-sm">
                <td className="py-2 px-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">₹{product.price}</td>
                <td className="py-2 px-4">{product.category}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
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

export default AdminProducts;
