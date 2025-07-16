import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import AdminLogin from "./pages/AdminLogin";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";
import AdminProductForm from "./pages/AdminProductForm";
import AdminAllProducts from "./pages/AdminAllProducts";

import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import Hero from "./components/Hero";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="bg-[#fffdf6] min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Show Hero only on Home */}
      {isHome && <Hero />}

      <main className="flex-1 mt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/products"
            element={
              <ProtectedAdminRoute>
                <AdminProducts />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/products/new"
            element={
              <ProtectedAdminRoute>
                <AdminProductForm />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/products/edit/:id"
            element={
              <ProtectedAdminRoute>
                <AdminProductForm />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedAdminRoute>
                <AdminOrders />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/all-products"
            element={
              <ProtectedAdminRoute>
                <AdminAllProducts />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
