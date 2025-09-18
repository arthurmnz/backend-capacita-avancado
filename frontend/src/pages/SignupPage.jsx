import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/authApi";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await signup(email, password);
      setMessage(
        "Cadastro realizado com sucesso! Redirecionando para o login...",
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Falha no cadastro. Tente outro email.");
    }
  };

  return (
    <div className="page-container">
      <div className="login-form-container">
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          {message && <p style={{ color: "green" }}>{message}</p>}
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;