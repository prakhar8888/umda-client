export const BACKEND_URL =
process.env.NODE_ENV === "production"
? "https://umda-backend.onrender.com/api"
: "http://localhost:5000/api";
