export const BACKEND_URL =
process.env.NODE_ENV === "production"
? "https://umda-backend.onrender.com"
: "http://localhost:5000";
