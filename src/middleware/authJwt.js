const jwt = require('jsonwebtoken');
const config = require('../../config/config.js');

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ message: 'Nenhum token fornecido!' });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (!config.jwtSecret) {
    return res.status(500).send({ message: 'JWT secret is not configured on the server.' });
  }
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Não autorizado!' });
    }
    req.restauranteId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken,
};
module.exports = authJwt;
