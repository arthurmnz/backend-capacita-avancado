const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createCategory = async (req, res) => {
  const { nome } = req.body;
  const userId = req.user.userId;

  try {
    const newCategory = await prisma.categoria.create({
      data: {
        nome,
        userId,
      },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "Erro ao criar categoria." });
  }
};

const getCategories = async (req, res) => {
  const userId = req.user.userId;

  try {
    const categories = await prisma.categoria.findMany({
      where: { userId },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar categorias." });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const category = await prisma.categoria.findUnique({
      where: { id: parseInt(id) },
    });

    if (!category || category.userId !== userId) {
      return res
        .status(404)
        .json({ error: "Categoria não encontrada ou você não tem permissão." });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar categoria." });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  const userId = req.user.userId;

  try {
    const existingCategory = await prisma.categoria.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingCategory || existingCategory.userId !== userId) {
      return res.status(404).json({
        error:
          "Categoria não encontrada ou você não tem permissão para atualizá-la.",
      });
    }

    const updatedCategory = await prisma.categoria.update({
      where: { id: parseInt(id) },
      data: { nome },
    });
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar categoria." });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const existingCategory = await prisma.categoria.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingCategory || existingCategory.userId !== userId) {
      return res.status(404).json({
        error:
          "Categoria não encontrada ou você não tem permissão para deletá-la.",
      });
    }

    await prisma.categoria.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar categoria." });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
