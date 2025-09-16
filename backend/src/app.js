require("dotenv").config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');
const authRoutes = require("./routes/authRoutes");
const produtosRoutes = require("./routes/ProdutosRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// Rota para a documentação da API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes); // Suas rotas normais
app.use('/api/products', produtosRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Documentação da API disponível em http://localhost:${PORT}/api-docs`);
});