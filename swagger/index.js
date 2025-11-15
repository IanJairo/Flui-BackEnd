const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerConfig = require('./config');

function setupSwagger(port, environment) {
  const isDevelopment = environment === 'development' || !environment;
  
  swaggerConfig.definition.servers = [
    {
      url: isDevelopment ? `http://localhost:${port}` : process.env.API_URL,
      description: isDevelopment ? 'Servidor de Desenvolvimento' : 'Servidor de Staging'
    }
  ];

  swaggerConfig.apis = [
    path.join(__dirname, './schemas/**/*.js'),
    path.join(__dirname, '../routes/**/*.js')
  ];

  return swaggerJSDoc(swaggerConfig);
}

module.exports = setupSwagger;
