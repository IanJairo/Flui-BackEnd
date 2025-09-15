'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numeroComanda: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'PREPARANDO' // Ex: PREPARANDO, PRONTO, ENTREGUE
      },
      dataHoraCriacao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      dataHoraPronto: {
        type: Sequelize.DATE
      },
      restauranteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Restaurantes', // Nome da tabela referenciada
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pedidos');
  }
};
