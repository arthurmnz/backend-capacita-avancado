import api from "./api";

export const getProdutos = async () => {
  const response = await api.get("/products/produtos");
  return response.data;
};

export const getProdutoById = async (id) => {
  const response = await api.get(`/products/produtos/${id}`);
  return response.data;
};

export const criarProduto = async (produto) => {
  const response = await api.post("/products/produtos", produto);
  return response.data;
};

export const atualizarProduto = async (id, produto) => {
  const response = await api.put(`/products/produtos/${id}`, produto);
  return response.data;
};

export const deletarProduto = async (id) => {
  const response = await api.delete(`/products/produtos/${id}`);
  return response.data;
};
