const express = require("express");
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Categorias
 *     description: Endpoints para gerenciamento de categorias
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome]
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *       401:
 *         description: Não autorizado
 *   get:
 *     summary: Lista todas as categorias do usuário logado
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Retorna uma categoria específica pelo ID
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria a ser buscada
 *     responses:
 *       200:
 *         description: Categoria encontrada com sucesso
 *       404:
 *         description: Categoria não encontrada ou não pertence ao usuário
 *       401:
 *         description: Não autorizado
 *   put:
 *     summary: Atualiza uma categoria pelo ID
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome]
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       404:
 *         description: Categoria não encontrada ou não pertence ao usuário
 *       401:
 *         description: Não autorizado
 *   delete:
 *     summary: Deleta uma categoria pelo ID
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria a ser deletada
 *     responses:
 *       204:
 *         description: Categoria deletada com sucesso (sem conteúdo)
 *       404:
 *         description: Categoria não encontrada ou não pertence ao usuário
 *       401:
 *         description: Não autorizado
 */

router.post("/", authMiddleware, categoryController.createCategory);
router.get("/", authMiddleware, categoryController.getCategories);
router.get("/:id", authMiddleware, categoryController.getCategoryById);
router.put("/:id", authMiddleware, categoryController.updateCategory);
router.delete("/:id", authMiddleware, categoryController.deleteCategory);

module.exports = router;
