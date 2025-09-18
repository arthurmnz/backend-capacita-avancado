import React, { useState } from "react";
import { Trash2 } from "lucide-react";

export default function Carrinho() {
  const [itens, setItens] = useState([
    { id: 1, nome: "Produto A", preco: 49.9, quantidade: 1, img: "https://via.placeholder.com/80" },
    { id: 2, nome: "Produto B", preco: 89.9, quantidade: 2, img: "https://via.placeholder.com/80" },
  ]);

  const aumentarQuantidade = (id) => {
    setItens((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );
  };

  const diminuirQuantidade = (id) => {
    setItens((prev) =>
      prev.map((item) =>
        item.id === id && item.quantidade > 1
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
    );
  };

  const removerItem = (id) => {
    setItens((prev) => prev.filter((item) => item.id !== id));
  };

  const calcularTotal = () => {
    return itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0).toFixed(2);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6">🛒 Meu Carrinho</h2>
      {itens.length === 0 ? (
        <p className="text-gray-500">Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {itens.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.img}
                    alt={item.nome}
                    className="w-16 h-16 rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{item.nome}</h3>
                    <p className="text-gray-500">
                      R$ {item.preco.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => diminuirQuantidade(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded-lg"
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.quantidade}</span>
                  <button
                    onClick={() => aumentarQuantidade(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded-lg"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removerItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-6">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-xl font-bold text-green-600">
              R$ {calcularTotal()}
            </span>
          </div>

          <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition">
            Finalizar Compra
          </button>
        </>
      )}
    </div>
  );
}
