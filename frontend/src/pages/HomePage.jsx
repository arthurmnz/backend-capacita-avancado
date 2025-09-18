import React, { useState, useEffect } from "react";
import { getProdutos, deletarProduto } from "../api/productsApi";
import ProdutoList from "../components/products/components/ProdutoList";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [produtos, setProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const data = await getProdutos();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleEdit = (produto) => {
    navigate(`/produtos/editar/${produto.id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este produto?")) {
      try {
        await deletarProduto(id);
        fetchProdutos(); // Re-fetch produtos after deletion
      } catch (error) {
        console.error("Erro ao deletar produto:", error);
      }
    }
  };

  const filteredProdutos = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="page-container">
      <h1>Produtos</h1>
      <input
        type="text"
        placeholder="Buscar produtos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
      />
      <ProdutoList
        produtos={filteredProdutos}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default HomePage;
