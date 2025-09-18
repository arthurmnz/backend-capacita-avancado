import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProductPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import "./styles/App.css";

function App() {
  return (
    <div
      className="App"
      style={{ minHeight: "100vh", width: "100vw", background: "transparent" }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <main style={{ padding: 0, margin: 0, width: "100vw", height: "100%" }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/produtos/:id" element={<ProductDetailPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/produtos/criar" element={<CreateProductPage />} />
            <Route path="/produtos/editar/:id" element={<EditProductPage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
