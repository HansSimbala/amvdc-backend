'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupAdditionalChargeModel(config) {
  const sequelize = setupDatabase(config);

  return sequelize.define('additionalCharge', {
    missingBottlesQuantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    missingBoxQuantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });
};
