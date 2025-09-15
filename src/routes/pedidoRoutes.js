const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/', pedidoController.create);
router.get('/prontos', pedidoController.findProntos);
router.get('/', pedidoController.findAll);
router.get('/:id', pedidoController.findOne);
router.patch('/:id/status', pedidoController.updateStatus);
router.post('/:pedidoId/inscrever', pedidoController.inscrever);
router.delete('/:id', pedidoController.delete);

module.exports = router;
