// ✅ Unified backend API base URL
export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://umda-backend.vercel.app" // 🌐 Replace with your deployed backend later
    : "http://localhost:5000";
