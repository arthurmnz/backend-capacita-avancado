const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/carrinho", produtosController.listarItens);
router.put("/carrinho/:id", produtosController.adicionarItens);
router.post("/carrinho", produtosController.criarCarrinho);
router.put("/carrinho/:id", produtosController.editarItens);
router.delete("/carrinho/:id", produtosController.deletarItem);

module.exports = router;