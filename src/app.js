require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('../models');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API do Pátio de Comidas funcionando!');
});

const restauranteRoutes = require('./routes/restauranteRoutes.js');
app.use('/api/restaurantes', restauranteRoutes);
app.use('/api/pedidos', require('./routes/pedidoRoutes.js'));
app.use('/api/auth', require('./routes/authRoutes.js'));

app.listen(port, async () => {
  console.log(`Servidor rodando na porta ${port}`);
  try {
    await db.sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
});

