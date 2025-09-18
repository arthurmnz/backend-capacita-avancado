const express = require("express");
const router = express.Router();
const produtosController = require("../controllers/ProdutosController");

/**
 * @swagger
 * tags:
 *   - name: Produtos
 *     description: Endpoints para gerenciamento de produtos
 */

/**
 * @swagger
 * /products/produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, preco]
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               descricao:
 *                 type: string
 *               img:
 *                 type: string
 *               categoriaId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 */

/**
 * @swagger
 * /products/produtos/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto a ser buscado
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 *   put:
 *     summary: Atualiza um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, preco]
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               descricao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       404:
 *         description: Produto não encontrado
 *   delete:
 *     summary: Deleta um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto a ser deletado
 *     responses:
 *       204:
 *         description: Produto deletado com sucesso (sem conteúdo)
 *       404:
 *         description: Produto não encontrado
 */

router.get("/produtos", produtosController.listarProdutos);
router.get("/produtos/:id", produtosController.buscarProdutoPorId);
router.post("/produtos", produtosController.criarProduto);
router.put("/produtos/:id", produtosController.atualizarProduto);
router.delete("/produtos/:id", produtosController.deletarProduto);

module.exports = router;
