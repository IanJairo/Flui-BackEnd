/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurante:
 *       type: object
 *       required:
 *         - nome
 *         - cnpj
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-gerado do restaurante
 *           example: 1
 *         nome:
 *           type: string
 *           description: Nome do restaurante
 *           example: Pizzaria Bella Napoli
 *         cnpj:
 *           type: string
 *           description: CNPJ do restaurante
 *           example: 12.345.678/0001-90
 *         localizacao:
 *           type: string
 *           description: Localização do restaurante no pátio
 *           example: Loja 42 - Segundo andar
 *         caminhoCardapioPdf:
 *           type: string
 *           description: Caminho para o PDF do cardápio
 *           example: /uploads/cardapio_pizzaria.pdf
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     
 *     RestauranteInput:
 *       type: object
 *       required:
 *         - nome
 *         - cnpj
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
 *         caminhoCardapioPdf:
 *           type: string
 *           example: /uploads/cardapio_pizzaria.pdf
 *     
 *     TempoMedio:
 *       type: object
 *       properties:
 *         tempoMedioMinutos:
 *           type: integer
 *           description: Tempo médio de preparo em minutos
 *           example: 25
 *         message:
 *           type: string
 *           description: Mensagem adicional
 *           example: Não há pedidos válidos para calcular o tempo médio.
 */

module.exports = {};
