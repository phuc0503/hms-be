'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sensors', {
      sensorId: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      sensorName: {
        type: Sequelize.STRING
      },
      minThreshold: {
        type: Sequelize.FLOAT
      },
      maxThreshold: {
        type: Sequelize.FLOAT
      },
      gardenId: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sensors');
  }
};