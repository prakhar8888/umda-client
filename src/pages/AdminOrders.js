import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get("http://localhost:5000/api/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    }

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(search.toLowerCase()) ||
    order.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#5D4037]">
        📦 Admin: All Orders
      </h2>

      {/* 🔍 Search Bar */}
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded w-80 shadow"
        />
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-center text-gray-600">No matching orders.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300 shadow">
          <thead>
            <tr className="bg-amber-100 text-sm text-gray-800">
              <th className="border px-3 py-2">Customer</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Phone</th>
              <th className="border px-3 py-2">Total</th>
              <th className="border px-3 py-2">Items</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Txn ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="text-sm text-center bg-white hover:bg-gray-50">
                <td className="border px-3 py-2">{order.customerName}</td>
                <td className="border px-3 py-2">{order.email}</td>
                <td className="border px-3 py-2">{order.phone}</td>
                <td className="border px-3 py-2 font-semibold">₹{order.totalAmount}</td>
                <td className="border px-3 py-2 text-left">
                  <ul className="list-disc list-inside">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border px-3 py-2">
                  {order.isPaid ? (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                      ✅ Paid
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold">
                      ❌ Not Paid
                    </span>
                  )}
                </td>
                <td className="border px-3 py-2 text-xs text-gray-700">
                  {order.paymentId || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrders;
