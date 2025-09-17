import React, { useState, useEffect } from 'react';

const ProdutoForm = ({ onSave, produtoToEdit }) => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    if (produtoToEdit) {
      setNome(produtoToEdit.nome);
      setPreco(produtoToEdit.preco);
      setCategoria(produtoToEdit.categoria);
      setDescricao(produtoToEdit.descricao);
    }
  }, [produtoToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ nome, preco, categoria, descricao });
    setNome('');
    setPreco('');
    setCategoria('');
    setDescricao('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Categoria"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        required
      />
      
      <button type="submit">{produtoToEdit ? 'Atualizar' : 'Adicionar'}</button>
    </form>
  );
};

export default ProdutoForm;