import React from 'react';

const ProdutoList = ({ Produtos, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Lista de Produtos</h2>
      <ul>
        {Produtos.map((produto) => (
          <li key={produto.id}>
            {produto.nome} - Preço: {produto.preco} - Categoria: {produto.categoria} - Descrição: {produto.descricao}
            <button onClick={() => onEdit(produto)}>Editar</button>
            <button onClick={() => onDelete(produto.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProdutoList;