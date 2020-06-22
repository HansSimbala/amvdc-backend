'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupLocationModel(config) {
  const sequelize = setupDatabase(config);

  return sequelize.define('location', {
    address: {
      type: Sequelize.STRING,
      allowNull: true
    },
    reference: {
        type: Sequelize.STRING,
        allowNull: true
    },
    latitude: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: true
    },
    longitude: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: true
    }
  });
};
