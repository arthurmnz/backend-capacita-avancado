const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.criarProduto = async (req, res) => {
  const { nome, preco, categoriaId, descricao, img } = req.body;

  try {
    const novoprodutoCriado = await prisma.produto.create({
      data: {
        nome: nome,
        preco: preco,
        descricao: descricao,
        img: img,
        categoriaId: parseInt(categoriaId),
      },
      include: {
        categoria: true,
      },
    });

    let msg = `O produto ${nome} criado com sucesso!`;
    console.log(msg);
    res.status(201).json(novoprodutoCriado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar produto." });
  }
};

exports.listarProdutos = async (req, res) => {
  try {
    const produtosDoBancoDeDados = await prisma.produto.findMany({
      include: {
        categoria: true,
      },
    });
    res.status(200).json(produtosDoBancoDeDados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar produtos." });
  }
};

exports.buscarProdutoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const produtoDoBanco = await prisma.produto.findFirst({
      where: {
        id: id,
      },
      include: {
        categoria: true,
      },
    });

    if (!produtoDoBanco) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    res.status(200).send(produtoDoBanco);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar produto." });
  }
};

exports.atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, preco, categoriaId, descricao, img } = req.body;

  try {
    const produtoAtualizado = await prisma.produto.update({
      where: {
        id: id,
      },
      data: {
        nome: nome,
        preco: preco,
        descricao: descricao,
        img: img,
        categoriaId: categoriaId ? parseInt(categoriaId) : undefined,
      },
      include: {
        categoria: true,
      },
    });

    res.status(200).send(produtoAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar produto." });
  }
};

exports.deletarProduto = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.produto.delete({
      where: {
        id: id,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar produto." });
  }
};
