'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    static associate(models) {
      SpotImage.belongsTo(models.Spot, { foreignKey: 'spotId' });
    }
  }
  SpotImage.init({
    url: DataTypes.STRING,
    spotId: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SpotImage',
  });
  return SpotImage;
};
