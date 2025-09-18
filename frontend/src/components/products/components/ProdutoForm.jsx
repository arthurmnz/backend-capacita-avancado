import React, { useEffect, useState } from "react";

const placeholder =
  "https://images.unsplash.com/photo-1602526432604-cdbe8f902a3e?q=80&w=600&auto=format&fit=crop";

const ProdutoForm = ({ onSave, categories = [], produtoToEdit }) => {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    if (produtoToEdit) {
      setNome(produtoToEdit.nome || "");
      setPreco(produtoToEdit.preco ?? "");
      setCategoriaId(produtoToEdit.categoria?.id ?? "");
      setDescricao(produtoToEdit.descricao || "");
      setImg(produtoToEdit.img || "");
    }
  }, [produtoToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      nome: nome.trim(),
      preco: Number(preco) || 0,
      categoriaId: categoriaId || null,
      descricao: descricao.trim(),
      img: img.trim(),
    };
    onSave(payload);
  };

  const handleClear = () => {
    setNome("");
    setPreco("");
    setCategoriaId("");
    setDescricao("");
    setImg("");
  };

  return (
    <div className="produto-form-container">
      <h2>{produtoToEdit ? "Editar Produto" : "Novo Produto"}</h2>

      <form className="produto-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="form-fields">
            <label>
              Nome
              <input
                type="text"
                placeholder="Ex.: Camiseta Premium"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </label>

            <label>
              Preço
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
              />
            </label>

            <label>
              Categoria
              <select
                value={categoriaId}
                onChange={(e) => setCategoriaId(e.target.value)}
                required
              >
                <option value="">Selecione...</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </label>

            <label>
              URL da Imagem
              <input
                type="url"
                placeholder="https://exemplo.com/imagem.jpg"
                value={img}
                onChange={(e) => setImg(e.target.value)}
              />
            </label>

            <label>
              Descrição
              <textarea
                rows={5}
                placeholder="Fale sobre o produto..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </label>
          </div>

          <div className="image-side">
            <div className="image-preview">
              <img src={img || placeholder} alt="Pré-visualização" />
            </div>
            <small className="image-hint">
              Dica: use imagens quadradas (1:1) para melhor resultado.
            </small>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={handleClear}>
            Limpar
          </button>
          <button type="submit" className="btn-primary">
            {produtoToEdit ? "Salvar alterações" : "Criar produto"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProdutoForm;