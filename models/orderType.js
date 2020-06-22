'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupOrderTypeModel(config) {
  const sequelize = setupDatabase(config);
  
  return sequelize.define('orderType', {
    name: {
      type: Sequelize.STRING(25),
      allowNull: false
    },
    description: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
  });
};
