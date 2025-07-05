import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/orders`)
      .then((res) => setOrders(res.data))
      .catch((err) => {
        console.error(err);
        setError("❌ Failed to load orders.");
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#fffdf6] p-8">
      <h2 className="text-2xl font-bold text-[#6a4c93] font-serif mb-6">
        📦 Admin — Orders
      </h2>

      {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

      <div className="overflow-x-auto bg-white border border-yellow-100 rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-[#fdf0e5] text-[#6a4c93] text-left">
            <tr>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Address</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 font-medium text-[#6a4c93]">
                  {order.customerName}
                </td>
                <td className="py-3 px-4">{order.email}</td>
                <td className="py-3 px-4">{order.phone}</td>
                <td className="py-3 px-4">{order.address}</td>
                <td className="py-3 px-4">
                  <ul className="list-disc ml-4 text-gray-700">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-3 px-4 font-bold text-green-700">
                  ₹{order.totalAmount}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-500 text-sm"
                >
                  No orders placed yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
