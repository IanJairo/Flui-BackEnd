'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    static associate(models) {
      Pedido.belongsTo(models.Restaurante, {
        foreignKey: 'restauranteId',
        as: 'restaurante'
      });
    }
  }
  Pedido.init({
    numeroComanda: DataTypes.INTEGER,
    status: DataTypes.STRING,
    dataHoraCriacao: DataTypes.DATE,
    dataHoraPronto: DataTypes.DATE,
    restauranteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};
