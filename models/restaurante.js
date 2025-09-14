'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurante extends Model {
    static associate(models) {
      Restaurante.hasMany(models.Pedido, {
        foreignKey: 'restauranteId',
        as: 'pedidos'
      });
    }
  }
  Restaurante.init({
    nome: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    localizacao: DataTypes.STRING,
    caminhoCardapioPdf: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Restaurante',
  });
  return Restaurante;
};
