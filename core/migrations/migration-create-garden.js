'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Gardens', {
      gardenId: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      gardenName: {
        type: Sequelize.STRING
      },
      deviceNum: {
        type: Sequelize.INTEGER
      },
      sensorNum: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Gardens');
  }
};