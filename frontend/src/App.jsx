import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Carrinho from './Carrinho';
import { getProdutos, criarProduto, atualizarProduto, deletarProduto } from './api';
import ProdutoList from './ProdutoList';
import ProdutoForm from './ProdutoForm';
import './App.css'; 

function App() {
  const [Produtos, setProdutos] = useState([]);
  const [produtoToEdit, setProdutoToEdit] = useState(null);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const data = await getProdutos();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleSave = async (produto) => {
    try {
      if (produtoToEdit) {
        await atualizarProduto(produtoToEdit.id, produto);
        setProdutoToEdit(null);
      } else {
        await criarProduto(produto);
      }
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  const handleEdit = (produto) => {
    setProdutoToEdit(produto);
  };

  const handleDelete = async (id) => {
    try {
      await deletarProduto(id);
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  const navigate = useNavigate();
  return (
    <div className="App">
      <button
        style={{
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          cursor: "pointer",
          position: "absolute",
          top: "20px",
          right: "20px"
        }}
        onClick={() => navigate("/carrinho")}
      >
        🛒 Carrinho
      </button>
      <Routes>
        <Route path="/" element={
          <>
            <h1>Gerenciamento de Produtos</h1>
            <ProdutoForm onSave={handleSave} produtoToEdit={produtoToEdit} />
            <hr />
            <ProdutoList Produtos={Produtos} onEdit={handleEdit} onDelete={handleDelete} />
          </>
        } />
        <Route path="/carrinho" element={<Carrinho />} />
      </Routes>
    </div>
  );
}

export default App;