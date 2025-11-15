/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo restaurante
 *     description: Cria uma nova conta de restaurante no sistema com senha criptografada
 *     tags: [Autenticação]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Restaurante registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       400:
 *         description: Dados inválidos ou CNPJ já cadastrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realiza login no sistema
 *     description: Autentica um restaurante usando CNPJ e senha, retornando um token JWT válido por 24 horas
 *     tags: [Autenticação]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Credenciais inválidas
 *       404:
 *         description: Restaurante não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

module.exports = {};
