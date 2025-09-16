const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0', // Versão da especificação OpenAPI
        info: {
            title: 'Sua API com Prisma',
            version: '1.0.0',
            description: 'Documentação da sua API Node.js com Prisma.',
        },
        servers: [
            {
                url: 'http://localhost:3000/api', // Altere a porta e URL base conforme necessário
                description: 'Servidor de Desenvolvimento'
            }
        ],
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js'], // Caminhos para os arquivos que contêm a documentação
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;