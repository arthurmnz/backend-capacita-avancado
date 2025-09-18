import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { criarProduto } from "../api/productsApi";
import { getCategories } from "../api/categoryApi";
import ProdutoForm from "../components/products/components/ProdutoForm";

const CreateProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError("Falha ao carregar categorias. Você precisa estar logado.");
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const handleSave = async (produto) => {
    try {
      const novoProduto = await criarProduto(produto);
      navigate(`/produtos/${novoProduto.id}`); // Navega para a página do novo produto
    } catch (err) {
      setError("Falha ao criar o produto.");
      console.error(err);
    }
  };

  return (
    <div className="page-container">
      <h1>Criar Novo Produto</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ProdutoForm onSave={handleSave} categories={categories} />
    </div>
  );
};

export default CreateProductPage;
