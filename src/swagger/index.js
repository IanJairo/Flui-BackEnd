const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerConfig = require('./config');

function setupSwagger(port, environment) {
  const isDevelopment = environment === 'development' || !environment;
  
  const externalPort = 3072;  
  
  swaggerConfig.definition.servers = [
    {
      url: isDevelopment ? `http://localhost:${externalPort}` : process.env.API_URL,
      description: isDevelopment ? 'Servidor de Desenvolvimento' : 'Servidor de Staging'
    }
  ];

  swaggerConfig.apis = [
    path.join(__dirname, './schemas/**/*.js'),
    path.join(__dirname, './paths/**/*.js')
  ];

  return swaggerJSDoc(swaggerConfig);
}

module.exports = setupSwagger;
