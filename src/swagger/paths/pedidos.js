/**
 * @swagger
 * /api/pedidos/prontos:
 *   get:
 *     summary: Lista pedidos prontos
 *     description: Retorna os últimos 7 pedidos com status "PRONTO", ordenados por data (rota pública)
 *     tags: [Pedidos]
 *     security: []
 *     responses:
 *       200:
 *         description: Lista de pedidos prontos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pedido'
 *       500:
 *         description: Erro ao buscar pedidos
 */

/**
 * @swagger
 * /api/pedidos/{pedidoId}/inscrever:
 *   post:
 *     summary: Inscreve-se para receber notificação
 *     description: Registra um email para ser notificado quando o pedido ficar pronto (rota pública)
 *     tags: [Pedidos]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: pedidoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido para acompanhamento
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InscricaoRequest'
 *     responses:
 *       201:
 *         description: Inscrição realizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InscricaoResponse'
 *       400:
 *         description: Email não fornecido
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro ao processar inscrição
 */

/**
 * @swagger
 * /api/pedidos:
 *   get:
 *     summary: Lista todos os pedidos
 *     description: Retorna todos os pedidos com informações do restaurante, ordenados por data de criação (rota pública)
 *     tags: [Pedidos]
 *     security: []
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pedido'
 */

/**
 * @swagger
 * /api/pedidos/{id}:
 *   get:
 *     summary: Busca um pedido por ID
 *     description: Retorna os detalhes completos de um pedido específico incluindo dados do restaurante (rota pública)
 *     tags: [Pedidos]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       404:
 *         description: Pedido não encontrado
 */

/**
 * @swagger
 * /api/pedidos:
 *   post:
 *     summary: Cria um novo pedido
 *     description: Registra um novo pedido no sistema com status inicial "PREPARANDO" (requer autenticação JWT)
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PedidoCreateRequest'
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro ao criar pedido
 */

/**
 * @swagger
 * /api/pedidos/{id}/status:
 *   patch:
 *     summary: Atualiza o status do pedido
 *     description: Altera o status de um pedido. Quando alterado para "PRONTO", envia notificações automáticas (requer JWT)
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PedidoStatusUpdateRequest'
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *       400:
 *         description: Status não fornecido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Pedido não encontrado
 */

/**
 * @swagger
 * /api/pedidos/{id}:
 *   delete:
 *     summary: Remove um pedido
 *     description: Exclui permanentemente um pedido do sistema (requer autenticação JWT)
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Pedido removido com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Pedido não encontrado
 */

module.exports = {};
