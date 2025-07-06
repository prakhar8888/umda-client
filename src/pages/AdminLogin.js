import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const isLoggedIn = localStorage?.getItem("adminLoggedIn");
      if (isLoggedIn === "true") {
        window.location.href = "/admin/products";
      }
    } catch (err) {
      console.error("❌ Error accessing localStorage:", err);
    } finally {
      setIsMounted(true);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setTimeout(() => {
        if (form.username === "admin" && form.password === "password") {
          localStorage.setItem("adminLoggedIn", "true");
          window.location.href = "/admin/products";
        } else {
          setError("❌ Invalid credentials. Try again.");
          setIsLoading(false);
        }
      }, 800); // Simulate network delay
    } catch (err) {
      console.error("❌ Login failed", err);
      setError("⚠️ Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fefae0]">
        <p className="text-gray-500">⏳ Loading Admin Panel...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fefae0] px-4">
      <motion.div
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-[#e0c3fc]"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[#6a4c93] font-serif">
          🛡️ UMDA Admin Portal
        </h2>

        <AnimatePresence>
          {error && (
            <motion.p
              className="text-red-600 text-sm mb-4 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Admin username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6a4c93]"
            required
            disabled={isLoading}
          />
          <input
            type="password"
            name="password"
            placeholder="Admin password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6a4c93]"
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#6a4c93] text-white py-2 rounded transition-all duration-200 ${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#5a3c83]"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-6">
          Default credentials: <strong>admin / password</strong>
        </p>
      </motion.div>
    </div>
  );
}

export default AdminLogin;
