import axios from "axios";
import { BACKEND_URL } from "../config";

// 🌍 API Base URL
const API = `${BACKEND_URL}/api/products`;

// ✅ GET all products
export const getAllProducts = async () => {
  try {
    const res = await axios.get(API);
    return res?.data || []; // fallback to empty array
  } catch (err) {
    console.error("🔥 Error in getAllProducts:", err);
    return [];
  }
};

// ✅ GET product by ID
export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${API}/${id}`);
    return res.data;
  } catch (err) {
    console.error("❌ Error in getProductById:", err);
    throw err;
  }
};

// ✅ POST new product
export const addProduct = async (newProduct) => {
  try {
    const res = await axios.post(API, newProduct);
    return res.data;
  } catch (err) {
    console.error("❌ Error in addProduct:", err);
    throw err;
  }
};

// ✅ PUT update product
export const updateProduct = async (id, data) => {
  try {
    const res = await axios.put(`${API}/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("❌ Error in updateProduct:", err);
    throw err;
  }
};

// ✅ DELETE product
export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`${API}/${id}`);
    return res.data;
  } catch (err) {
    console.error("❌ Error in deleteProduct:", err);
    throw err;
  }
};
