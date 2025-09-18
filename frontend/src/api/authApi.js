import api from "./api";

export const login = async (email, password) => {
  const response = await api.post("/auth/signin", { email, password });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

export const signup = async (email, password) => {
  const response = await api.post("/auth/signup", { email, password });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
