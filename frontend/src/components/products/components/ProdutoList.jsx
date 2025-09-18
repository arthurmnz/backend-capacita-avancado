import React from "react";
import { Link } from "react-router-dom";

const ProdutoList = ({ produtos, onEdit, onDelete }) => {
  if (!produtos || produtos.length === 0) {
    return <p>Nenhum produto encontrado.</p>;
  }

  return (
    <div className="produto-list-grid">
      <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "100%", display: "contents" }}>
        {produtos.map((produto) => (
          <li key={produto.id} className="produto-card">
            <img
              src={produto.img || "https://via.placeholder.com/220"}
              alt={produto.nome}
            />
            <h2>{produto.nome}</h2>
            <div className="preco">Preço: R$ {produto.preco ? produto.preco.toFixed(2) : "0.00"}</div>
            <div className="categoria">Categoria: {produto.categoria?.nome || "N/A"}</div>
            <div className="descricao">{produto.descricao}</div>
            <div className="actions">
              <button onClick={() => onEdit(produto)}>Editar</button>
              <button onClick={() => onDelete(produto.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProdutoList;