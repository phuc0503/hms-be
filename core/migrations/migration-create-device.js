'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Devices', {
      deviceId: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      deviceName: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      timeOn: {
        type: Sequelize.DATE
      },
      timeOff: {
        type: Sequelize.DATE
      },
      operatingTime: {
        type: Sequelize.FLOAT
      },
      recommendedTime: {
        type: Sequelize.FLOAT
      },
      gardenId: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Devices');
  }
};