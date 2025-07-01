import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/admin/login" />;
};

export default ProtectedAdminRoute;
