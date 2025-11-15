/**
 * @swagger
 * components:
 *   schemas:
 *     Pedido:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         numeroComanda:
 *           type: string
 *           example: CMD-001
 *         restauranteId:
 *           type: integer
 *           example: 1
 *         status:
 *           type: string
 *           enum: [PREPARANDO, PRONTO, ENTREGUE, CANCELADO]
 *           example: PREPARANDO
 *         dataHoraCriacao:
 *           type: string
 *           format: date-time
 *         dataHoraPronto:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         restaurante:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             nome:
 *               type: string
 *               example: Pizzaria Bella Napoli
 *     
 *     PedidoCreateRequest:
 *       type: object
 *       required:
 *         - numeroComanda
 *         - restauranteId
 *       properties:
 *         numeroComanda:
 *           type: string
 *           example: CMD-001
 *         restauranteId:
 *           type: integer
 *           example: 1
 *     
 *     PedidoStatusUpdateRequest:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum: [PREPARANDO, PRONTO, ENTREGUE, CANCELADO]
 *           example: PRONTO
 *     
 *     InscricaoRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: cliente@exemplo.com
 *     
 *     InscricaoResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Inscrição realizada com sucesso!
 *         inscricao:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             clienteId:
 *               type: integer
 *               example: 5
 *             pedidoId:
 *               type: integer
 *               example: 10
 *             status:
 *               type: string
 *               enum: [PENDENTE, ENVIADA]
 *               example: PENDENTE
 */

module.exports = {};
