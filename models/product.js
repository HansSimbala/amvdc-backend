'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupProductModel(config) {
  const sequelize = setupDatabase(config);
  const product = sequelize.define('product', {
    name: {
      type: Sequelize.STRING(25),
      allowNull: true
    },
    description: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id'
      }
    }
  });
  product.belongsTo(sequelize.models.category, { as: 'category' });
  return product;
};
