'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inscricao extends Model {
    static associate(models) {
      Inscricao.belongsTo(models.Cliente, { foreignKey: 'clienteId' });
      Inscricao.belongsTo(models.Pedido, { foreignKey: 'pedidoId' });
    }
  }
  Inscricao.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Inscricao',
  });
  return Inscricao;
};
