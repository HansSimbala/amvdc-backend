'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupOrderModel(config) {
  const sequelize = setupDatabase(config);

  const order = sequelize.define('order', {
    customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'id'
        }
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    latitude: {
      type: Sequelize.DECIMAL(10, 8),
      allowNull: true
    },
    longitude: {
      type: Sequelize.DECIMAL(11, 8),
      allowNull: true
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  });
  order.belongsTo(sequelize.models.customer, { as: 'customer' });
  return order;
};
