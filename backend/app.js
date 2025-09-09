const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();
app.use(express.json());


const produtosRoutes = require('./ProdutosRoutes.js');
app.use(produtosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});