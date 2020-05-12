'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupOrderDetailModel(config) {
  const sequelize = setupDatabase(config);

  const orderDetail = sequelize.define('orderDetail', {
    orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id'
        }
    },
    customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'id'
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
  });
  orderDetail.belongsTo(sequelize.models.order, { as: 'order' });
  orderDetail.belongsTo(sequelize.models.customer, { as: 'customer' });
  return orderDetail;
};
