import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
const isLoggedIn = localStorage.getItem("adminLoggedIn");

if (isLoggedIn === "true") {
return children;
} else {
return <Navigate to="/admin/login" />;
}
}

export default ProtectedAdminRoute;
