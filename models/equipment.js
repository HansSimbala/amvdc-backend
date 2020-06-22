'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupEquipmentModel(config) {
  const sequelize = setupDatabase(config);
  
  return sequelize.define('equipment', {
    name: {
      type: Sequelize.STRING(25),
      allowNull: true
    },
    description: {
      type: Sequelize.STRING(50),
      allowNull: true
    }
  });
};
