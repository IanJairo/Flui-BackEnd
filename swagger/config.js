const path = require('path');

const swaggerConfig = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Flui API',
      version: '1.0.0',
      description: 'Documentação completa da API de gerenciamento do Pátio de Comidas',
      contact: {
        name: '@IanJairo',
        email: 'contato@flui.ianjairo.dev'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT obtido através do endpoint /api/auth/login'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: []
};

module.exports = swaggerConfig;
