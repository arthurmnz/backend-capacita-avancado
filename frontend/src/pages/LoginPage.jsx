import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import toast from "react-hot-toast"; // Importa o toast

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Verificando..."); // Mostra um toast de carregamento

    try {
      await login(email, password);
      toast.dismiss(loadingToast); // Remove o toast de carregamento
      toast.success("Login realizado com sucesso!");
      navigate("/");
      window.location.reload(); // Força o reload para a Navbar atualizar
    } catch (err) {
      toast.dismiss(loadingToast); // Remove o toast de carregamento
      toast.error(err.message); // Mostra o erro vindo da API
    }
  };

  return (
    <div className="page-container">
      <div className="login-form-container">
        <h2>Login</h2>
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
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
