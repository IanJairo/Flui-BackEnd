'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurante extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Pedido, { foreignKey: 'restauranteId', as: 'pedidos' });
    }
  }
  Restaurante.init({
    nome: DataTypes.STRING,
    cnpj: {
      type: DataTypes.STRING,
      unique: true
    },
    localizacao: DataTypes.STRING,
    caminhoCardapioPdf: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Restaurante',
  });
  return Restaurante;
};

