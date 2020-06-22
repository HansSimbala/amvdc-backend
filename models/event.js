'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupEventModel(config) {
  const sequelize = setupDatabase(config);
  
  return sequelize.define('event', {
    name: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    billboard: {
        type: Sequelize.STRING,
        allowNull: true
    },
    institution: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    isEquipped: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    startDate: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    endDate: {
      type: Sequelize.DATEONLY,
      allowNull: true
    }
  });
};
