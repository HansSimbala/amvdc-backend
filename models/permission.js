'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupPermissionModel(config) {
  const sequelize = setupDatabase(config);

  return sequelize.define('permission', {
    name: {
      type: Sequelize.STRING(25),
      allowNull: true
    },
    slug: {
      type: Sequelize.STRING(25),
      allowNull: true
    },
    description: {
      type: Sequelize.STRING(50),
      allowNull: true
    }
  });
};
