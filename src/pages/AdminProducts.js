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
console.error("🔥 Error while fetching products:", err);
setError("🚨 Failed to load products. Check console.");
setLoading(false);
}
};

const handleDelete = async (id) => {
try {
await deleteProduct(id);
fetchProducts();
} catch (err) {
console.error("❌ Failed to delete product:", err);
alert("Delete failed");
}
};

useEffect(() => {
fetchProducts();
}, []);

if (loading)
return <div className="p-10 text-center text-gray-600">Loading...</div>;

if (error)
return (
<div className="p-10 text-center text-red-600 font-bold">
{error}
</div>
);

return (
<div className="p-6">
<div className="flex justify-between items-center mb-6">
<h1 className="text-2xl font-bold text-[#6a4c93]">Admin Panel</h1>
<Link to="/admin/products/new" className="bg-[#6a4c93] text-white px-4 py-2 rounded hover:bg-[#5a3c83]" >
➕ Add Product
</Link>
</div>
{products.length === 0 ? (
<div className="text-center text-gray-600">No products found.</div>
) : (
<table className="w-full text-sm text-left">
<thead className="bg-gray-200">
<tr>
<th className="p-3">Image</th>
<th className="p-3">Name</th>
<th className="p-3">Price</th>
<th className="p-3">Category</th>
<th className="p-3">Actions</th>
</tr>
</thead>
<tbody>
{products.map((prod) => (
<tr key={prod._id} className="border-t">
<td className="p-3">
<img src={prod.image} alt={prod.name} className="w-20 h-20 object-cover rounded" />
</td>
<td className="p-3">{prod.name}</td>
<td className="p-3">₹{prod.price}</td>
<td className="p-3">{prod.category}</td>
<td className="p-3">
<Link
to={/admin/products/edit/${prod._id}}
className="text-blue-600 hover:underline mr-4"
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
</tbody>
</table>
)}
</div>
);
}

export default AdminProducts;
