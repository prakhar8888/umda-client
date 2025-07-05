import axios from "axios";
import { BACKEND_URL } from "../config";

const API = `${BACKEND_URL}/api/products`;

export const getAllProducts = async () => {
  try {
    const res = await axios.get(API);
    return res?.data || []; // ✅ Safe fallback
  } catch (err) {
    console.error("🔥 Error in getAllProducts:", err);
    return []; // ✅ Empty array if error occurs
  }
};

export const getProductById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

export const addProduct = async (newProduct) => {
  const res = await axios.post(API, newProduct);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};
