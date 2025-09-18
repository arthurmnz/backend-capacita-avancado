const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.adicionarAoCarrinho = async (req, res) => {
  const { produtoId, quantidade } = req.body;

  try {
    const novoItem = await prisma.carrinho.create({
      data: {
        produtoId: produtoId,
        quantidade: quantidade,
      },
      include: {
        produto: true, // retorna também os dados do produto
      },
    });

    let msg = `Produto ${produtoId} adicionado ao carrinho com sucesso!`;
    console.log(msg);
    res.status(201).json(novoItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao adicionar produto ao carrinho." });
  }
};

exports.listarCarrinho = async (req, res) => {
  try {
    const itensCarrinho = await prisma.carrinho.findMany({
      include: {
        produto: true, // traz informações do produto junto
      },
    });

    res.status(200).json(itensCarrinho);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao listar carrinho." });
  }
};

exports.buscarItemCarrinhoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const itemCarrinho = await prisma.carrinho.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        produto: true,
      },
    });

    if (!itemCarrinho) {
      return res.status(404).json({ erro: "Item do carrinho não encontrado." });
    }

    res.status(200).json(itemCarrinho);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar item no carrinho." });
  }
};

exports.atualizarItemCarrinho = async (req, res) => {
  const { id } = req.params;
  const { quantidade } = req.body;

  try {
    const itemAtualizado = await prisma.carrinho.update({
      where: {
        id: parseInt(id),
      },
      data: {
        quantidade: quantidade,
      },
      include: {
        produto: true,
      },
    });

    let msg = `Item do carrinho com id ${id} atualizado com sucesso!`;
    console.log(msg);
    res.status(200).json(itemAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar item do carrinho." });
  }
};

exports.removerItemCarrinho = async (req, res) => {
  const { id } = req.params;

  try {
    const itemDeletado = await prisma.carrinho.delete({
      where: {
        id: parseInt(id),
      },
    });

    let msg = `Item do carrinho com id ${id} removido com sucesso!`;
    console.log(msg);
    res.status(200).json(itemDeletado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao remover item do carrinho." });
  }
};
