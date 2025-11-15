/**
 * @swagger
 * /api/restaurantes:
 *   get:
 *     summary: Lista todos os restaurantes
 *     description: Retorna uma lista com todos os restaurantes cadastrados no pátio de comidas (rota pública)
 *     tags: [Restaurantes]
 *     security: []
 *     responses:
 *       200:
 *         description: Lista de restaurantes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurante'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/restaurantes/{id}:
 *   get:
 *     summary: Busca um restaurante por ID
 *     description: Retorna os detalhes completos de um restaurante específico (rota pública)
 *     tags: [Restaurantes]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do restaurante
 *         example: 1
 *     responses:
 *       200:
 *         description: Restaurante encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurante'
 *       404:
 *         description: Restaurante não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Restaurante com ID=1 não encontrado.
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/restaurantes/{id}/tempo-medio:
 *   get:
 *     summary: Obtém o tempo médio de preparo
 *     description: Calcula o tempo médio de preparo baseado nos últimos 10 pedidos prontos do restaurante (rota pública)
 *     tags: [Restaurantes]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do restaurante
 *         example: 1
 *     responses:
 *       200:
 *         description: Tempo médio calculado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TempoMedio'
 *       500:
 *         description: Erro ao calcular o tempo médio
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/restaurantes/{id}:
 *   put:
 *     summary: Atualiza um restaurante
 *     description: Atualiza os dados de um restaurante existente (requer autenticação JWT)
 *     tags: [Restaurantes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do restaurante a ser atualizado
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestauranteInput'
 *     responses:
 *       200:
 *         description: Restaurante atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Restaurante atualizado com sucesso.
 *       401:
 *         description: Não autorizado - Token inválido ou ausente
 *       403:
 *         description: Token não fornecido
 *       404:
 *         description: Restaurante não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/restaurantes/{id}:
 *   delete:
 *     summary: Remove um restaurante
 *     description: Exclui permanentemente um restaurante do sistema (requer autenticação JWT)
 *     tags: [Restaurantes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do restaurante a ser removido
 *         example: 1
 *     responses:
 *       200:
 *         description: Restaurante removido com sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Token não fornecido
 *       404:
 *         description: Restaurante não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

module.exports = {};
