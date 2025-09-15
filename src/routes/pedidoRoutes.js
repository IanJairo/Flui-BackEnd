const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const { verifyToken } = require('../middleware/authJwt');

// --- ROTAS PÚBLICAS ---
router.get('/prontos', pedidoController.findProntos);
router.post('/:pedidoId/inscrever', pedidoController.inscrever);
router.get('/', pedidoController.findAll); // Listar todos os pedidos
router.get('/:id', pedidoController.findOne); // Detalhes de um pedido

// --- ROTAS PROTEGIDAS ---
router.post('/', [verifyToken], pedidoController.create);
router.patch('/:id/status', [verifyToken], pedidoController.updateStatus);
router.delete('/:id', [verifyToken], pedidoController.delete);

module.exports = router;

