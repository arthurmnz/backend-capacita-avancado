require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const produtosRoutes = require("./routes/ProdutosRoutes.js");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// Rotas
app.use("/auth", authRoutes);
app.use("/products", produtosRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
