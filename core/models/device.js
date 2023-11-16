'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Device.belongsTo(models.Garden, {
        foreignKey: 'gardenId'
      });
    }
  };
  Device.init({
    deviceName:      DataTypes.STRING,
    status:          DataTypes.BOOLEAN,
    timeOn:          DataTypes.DATE,
    timeOff:         DataTypes.DATE,
    operatingTime:   DataTypes.FLOAT,
    recommendedTime: DataTypes.FLOAT,
    gardenId:        DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Device',
  });
  return Device;
};