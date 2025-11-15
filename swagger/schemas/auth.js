/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - nome
 *         - cnpj
 *         - password
 *       properties:
 *         nome:
 *           type: string
 *           example: Pizzaria Bella Napoli
 *         cnpj:
 *           type: string
 *           example: 12.345.678/0001-90
 *         localizacao:
 *           type: string
 *           example: Loja 42 - Segundo andar
 *         password:
 *           type: string
 *           format: password
 *           example: senha123@forte
 *     
 *     RegisterResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Restaurante registrado com sucesso!
 *         restaurante:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             nome:
 *               type: string
 *               example: Pizzaria Bella Napoli
 *             cnpj:
 *               type: string
 *               example: 12.345.678/0001-90
 *     
 *     LoginRequest:
 *       type: object
 *       required:
 *         - cnpj
 *         - password
 *       properties:
 *         cnpj:
 *           type: string
 *           example: 12.345.678/0001-90
 *         password:
 *           type: string
 *           format: password
 *           example: senha123@forte
 *     
 *     LoginResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: Pizzaria Bella Napoli
 *         cnpj:
 *           type: string
 *           example: 12.345.678/0001-90
 *         accessToken:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */

module.exports = {};
