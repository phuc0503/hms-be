'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Garden extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Garden.belongsToMany(models.User, { through: 'UserGardens' });
      Garden.hasMany(models.Sensor, { foreignKey: 'gardenId' });
      Garden.hasMany(models.Device, { foreignKey: 'gardenId' });
    }
  };
  Garden.init({
    gardenId: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false
    },
    gardenName: DataTypes.STRING,
    deviceNum: DataTypes.INTEGER,
    sensorNum: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Garden',
  });
  return Garden;
};