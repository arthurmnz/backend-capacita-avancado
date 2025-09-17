import axios from 'axios';

const API_URL = 'postgresql://projeto:123456@localhost:5432/projetoLoja?schema=public'; // Substitua pelo URL da sua API

export const getProdutos = async () => {
  const response = await axios.get(`${API_URL}/produtos`);
  return response.data;
};

export const criarProduto = async (produto) => {
  const response = await axios.post(`${API_URL}/produtos`, produto);
  return response.data;
};

export const atualizarProduto = async (id, produto) => {
  const response = await axios.put(`${API_URL}/produtos/${id}`, produto);
  console.log(response)
  return response.data;
};

export const deletarProduto = async (id) => {
  const response = await axios.delete(`${API_URL}/produtos/${id}`);
  return response.data;
};