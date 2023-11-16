'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SoilData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SoilData.belongsTo(models.Sensor, { foreignKey: 'sensorId' });
    }
  };
  SoilData.init({
    measureAt: {
      type: DataTypes.DATE,
      primaryKey: true,
      autoIncrement: false
    },
    sensorId:  DataTypes.STRING,
    value:     DataTypes.FLOAT,
    unit:      DataTypes.STRING,
    
  }, {
    sequelize,
    timestamps: true,
    createdAt: 'measureAt',
    updatedAt: false,
    modelName: 'SoilData',
  });
  return SoilData;
};