export const BACKEND_URL =
process.env.NODE_ENV === "production"
? "https://umda-backend.onrender.com" // ✅ This is your working backend
: "http://localhost:5000";
