// ✅ Unified backend API base URL
export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://umda-backend.vercel.app" // 🌐 Replace with your deployed backend URL
    : "http://localhost:5000";
