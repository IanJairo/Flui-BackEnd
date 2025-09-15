'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Restaurantes', 'password', {
      type: Sequelize.STRING,
      allowNull: true, // Permite nulo inicialmente para não quebrar restaurantes existentes
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Restaurantes', 'password');
  }
};
