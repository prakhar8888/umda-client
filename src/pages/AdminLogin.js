import React, { useState } from "react";

function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (form.username === "admin" && form.password === "password") {
        localStorage.setItem("adminLoggedIn", "true");
        window.location.href = "/admin/products"; // ✅ Redirect only after successful login
      } else {
        setError("❌ Invalid credentials. Try again.");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("⚠️ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fefae0] px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-[#e0c3fc]">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#6a4c93] font-serif">
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
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6a4c93]"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6a4c93]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#6a4c93] text-white py-2 rounded hover:bg-[#5a3c83] transition-all duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-6">
          Default credentials: <strong>admin / password</strong>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
