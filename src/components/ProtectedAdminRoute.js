import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  try {
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    return isLoggedIn ? children : <Navigate to="/admin/login" />;
  } catch (err) {
    console.error("🔒 Error checking login status:", err);
    return <Navigate to="/admin/login" />;
  }
};

export default ProtectedAdminRoute;
