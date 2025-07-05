// ✅ Unified backend API base URL
export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://umda-backend.onrender.com" // ✅ Correct Render backend URL
    : "http://localhost:5000";
