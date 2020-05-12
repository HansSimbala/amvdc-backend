'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupInventoryModel(config) {
  const sequelize = setupDatabase(config);

  const inventory = sequelize.define('inventory', {
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        }
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
  });
  inventory.belongsTo(sequelize.models.product, { as: 'product' });
  return inventory;
};
