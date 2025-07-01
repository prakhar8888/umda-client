import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { state } = useCart();
  const cartCount = state?.cartItems?.length || 0;
  const isAdmin = localStorage.getItem("adminLoggedIn") === "true";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin/login");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-[#6a4c93] font-serif">
        <Link to="/">UMDA Ethnic</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/shop" className="hover:text-indigo-600">
          Shop
        </Link>
        <Link to="/cart" className="hover:text-indigo-600">
          Cart ({cartCount})
        </Link>

        {isAdmin && (
          <>
            <Link to="/admin/products" className="hover:text-indigo-600">
              Admin Panel
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Logout 🔒
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
