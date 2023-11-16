'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MoisData', {
      measureAt: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DATE
      },
      sensorId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.FLOAT
      },
      unit: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MoisData');
  }
};