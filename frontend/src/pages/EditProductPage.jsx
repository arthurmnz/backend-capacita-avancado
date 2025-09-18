import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProdutoById, atualizarProduto } from "../api/productsApi";
import { getCategories } from "../api/categoryApi";
import ProdutoForm from "../components/products/components/ProdutoForm";

const EditProductPage = () => {
  const [produto, setProduto] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [produtoData, categoriesData] = await Promise.all([
          getProdutoById(id),
          getCategories(),
        ]);
        setProduto(produtoData);
        setCategories(categoriesData);
      } catch (err) {
        setError("Falha ao carregar dados para edição.");
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const handleSave = async (produtoAtualizado) => {
    try {
      await atualizarProduto(id, produtoAtualizado);
      navigate(`/produtos/${id}`); // Navega de volta para a página de detalhes
    } catch (err) {
      setError("Falha ao atualizar o produto.");
      console.error(err);
    }
  };

  if (!produto) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="page-container">
      <h1>Editar Produto</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ProdutoForm
        onSave={handleSave}
        categories={categories}
        produtoToEdit={produto}
      />
    </div>
  );
};

export default EditProductPage;
