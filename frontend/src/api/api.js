import axios from "axios";

const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response, // Passa a resposta de sucesso adiante
  (error) => {
    // Extrai a mensagem de erro específica do backend, se disponível
    const message =
      error.response?.data?.error ||
      error.message ||
      "Ocorreu um erro inesperado.";
    // Rejeita a promessa com uma mensagem de erro padronizada
    return Promise.reject(new Error(message));
  },
);

export default api;
