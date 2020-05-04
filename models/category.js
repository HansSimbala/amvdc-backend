'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupCategoryModel(config) {
  const sequelize = setupDatabase(config);

  return sequelize.define('category', {
    name: {
      allowNull: false,
      type: Sequelize.STRING(25)
    },
    description: {
      allowNull: false,
      type: Sequelize.STRING(50)
    }
  });
};
