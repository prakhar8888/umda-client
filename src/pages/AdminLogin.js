import React, { useEffect, useState } from "react";

function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  // ✅ Don't redirect if already on this page
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (isLoggedIn === "true") {
      // Already logged in, redirect to products panel
      window.location.href = "/admin/products";
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔐 Replace with your own login logic or credentials
    if (form.username === "admin" && form.password === "password") {
      localStorage.setItem("adminLoggedIn", "true");
      window.location.href = "/admin/products";
    } else {
      setError("❌ Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fefae0]">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#6a4c93]">
          🔐 Admin Login
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#6a4c93] text-white py-2 rounded hover:bg-[#5a3c83]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
