const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/', pedidoController.create);
router.get('/', pedidoController.findAll);
router.get('/:id', pedidoController.findOne);
router.patch('/:id/status', pedidoController.updateStatus);
router.delete('/:id', pedidoController.delete);

module.exports = router;
