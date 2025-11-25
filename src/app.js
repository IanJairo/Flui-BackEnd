require('dotenv').config();
const express = require('express');
const cors = require('cors');  // ← 1. Importar cors
const app = express();
const port = process.env.PORT || 3000;
const db = require('../models');

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.NODE_ENV === 'production'
      ? ['https://flui.ianjairo.dev', 'https://flui.ianjairo.dev']
      : '*';
    
    if (allowedOrigins === '*' || !origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));  

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const isProduction = process.env.NODE_ENV === 'production';
const isStaging = process.env.NODE_ENV === 'staging';
const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

if (!isProduction) {
  const swaggerUi = require('swagger-ui-express');
  const basicAuth = require('express-basic-auth');
  const setupSwagger = require('./swagger');

  const swaggerSpec = setupSwagger(port, process.env.NODE_ENV);

  const swaggerUsers = {};
  swaggerUsers[process.env.SWAGGER_USER || 'admin'] = process.env.SWAGGER_PASSWORD;

  const swaggerAuthMiddleware = basicAuth({
    users: swaggerUsers,
    challenge: true,
    realm: `API Pátio de Comidas - Documentação ${isStaging ? '[STAGING]' : '[DEV]'}`,
    unauthorizedResponse: (req) => {
      return {
        error: 'Acesso negado',
        message: 'Credenciais inválidas para acessar a documentação',
        environment: process.env.NODE_ENV
      };
    }
  });

  app.use(
    '/api-docs',
    swaggerAuthMiddleware,
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customSiteTitle: `API Pátio de Comidas - Documentação [${process.env.NODE_ENV?.toUpperCase()}]`,
      customCss: '.swagger-ui .topbar { display: none; }',
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true,
        syntaxHighlight: {
          theme: 'monokai'
        }
      }
    })
  );

  console.log(`Swagger habilitado e protegido por Basic Auth [${process.env.NODE_ENV}]`);
  console.log(`Documentação: http://localhost:${port}/api-docs`);
  console.log(`Usuário: ${process.env.SWAGGER_USER || 'admin'}`);
  
} else {
  app.use('/api-docs', (req, res) => {
    console.warn(`Tentativa de acesso ao Swagger em produção bloqueada - IP: ${req.ip}`);
    res.status(404).json({ 
      error: 'Not Found',
      message: 'A página não existe'
    });
  });
}

app.get('/', (req, res) => {
  res.json({ 
    message: 'API do Pátio de Comidas funcionando!',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

const restauranteRoutes = require('./routes/restauranteRoutes.js');
app.use('/api/restaurantes', restauranteRoutes);
app.use('/api/pedidos', require('./routes/pedidoRoutes.js'));
app.use('/api/auth', require('./routes/authRoutes.js'));

app.listen(port, async () => {
  console.log('='.repeat(60));
  console.log('🚀 HELLO WORLD - ARGO ROLLOUTS DEMO v2.0');
  console.log('='.repeat(60));
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
  
  try {
    await db.sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('❌ Não foi possível conectar ao banco de dados:', error);
  }
  console.log('='.repeat(60));
});

module.exports = app;
