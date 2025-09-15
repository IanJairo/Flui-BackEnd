const express = require('express');
const router = express.Router();
const restauranteController = require('../controllers/restauranteController');
const { verifyToken } = require('../middleware/authJwt');

// --- ROTAS PÚBLICAS ---
router.get('/', restauranteController.findAll);
router.get('/:id', restauranteController.findOne);
router.get('/:id/tempo-medio', restauranteController.getTempoMedio);

// --- ROTAS PROTEGIDAS ---
router.put('/:id', [verifyToken], restauranteController.update);
router.delete('/:id', [verifyToken], restauranteController.delete);

router.post('/', restauranteController.create);


module.exports = router;