import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProdutoById, deletarProduto } from "../api/productsApi";

const ProductDetailPage = () => {
  const [produto, setProduto] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const data = await getProdutoById(id);
        setProduto(data);
      } catch (err) {
        setError("Produto não encontrado.");
        console.error(err);
      }
    };

    fetchProduto();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja deletar este produto?")) {
      try {
        await deletarProduto(id);
        navigate("/"); // Redireciona para a home após deletar
      } catch (err) {
        console.error("Erro ao deletar produto:", err);
        setError("Falha ao deletar o produto.");
      }
    }
  };

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!produto) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="page-container">
      <img
        src={produto.img || "https://via.placeholder.com/300"}
        alt={produto.nome}
        style={{ maxWidth: "300px", width: "100%" }}
      />
      <h1>{produto.nome}</h1>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        R$ {produto.preco ? produto.preco.toFixed(2) : "0.00"}
      </p>
      <p>
        <strong>Categoria:</strong> {produto.categoria?.nome || "N/A"}
      </p>
      <p>{produto.descricao}</p>

      <div style={{ marginTop: "2rem" }}>
        <Link to={`/produtos/editar/${id}`}>
          <button style={{ marginRight: "1rem" }}>Editar</button>
        </Link>
        <button onClick={handleDelete}>Deletar</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
