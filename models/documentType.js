'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupDocumentTypeModel(config) {
  const sequelize = setupDatabase(config);

  return sequelize.define('documentType', {
    name: {
      allowNull: false,
      type: Sequelize.STRING(25)
    }
  });
};
