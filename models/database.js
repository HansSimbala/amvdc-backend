'use strict';

const Sequelize = require('sequelize');

let db = null;

module.exports = function setupDatabase (config) {
  if (!db) {
    db = new Sequelize(config);
  }

  return db;
};
