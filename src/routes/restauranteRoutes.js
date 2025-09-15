const express = require('express');
const router = express.Router();
const restauranteController = require('../controllers/restauranteController');

router.post('/', restauranteController.create);
router.get('/', restauranteController.findAll);
router.get('/:id/tempo-medio', restauranteController.getTempoMedio);
router.get('/:id', restauranteController.findOne);
router.put('/:id', restauranteController.update);
router.delete('/:id', restauranteController.delete);

module.exports = router;

