'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sensor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sensor.belongsTo(models.Garden, {
        foreignKey: 'gardenId'
      });
      Sensor.hasMany(models.TempData, { foreignKey: 'sensorId' });
      Sensor.hasMany(models.HumiData, { foreignKey: 'sensorId' });
      Sensor.hasMany(models.SoilData, { foreignKey: 'sensorId' });
      Sensor.hasMany(models.LightData, { foreignKey: 'sensorId' });
    }
  };
  Sensor.init({
    sensorName:    DataTypes.STRING,
    minThreshold:  DataTypes.FLOAT,
    maxThreshold:  DataTypes.FLOAT,
    gardenId:      DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Sensor',
  });
  return Sensor;
};