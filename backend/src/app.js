require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../swagger");
const authRoutes = require("./routes/authRoutes");
const produtosRoutes = require("./routes/ProdutosRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRoutes);
app.use("/products", produtosRoutes);
app.use("/categories", categoryRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(
    `Documentação da API disponível em http://localhost:${PORT}/api-docs`,
  );
});
