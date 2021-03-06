'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupOrderDetailModel(config) {
  const sequelize = setupDatabase(config);

  const orderDetail = sequelize.define('orderDetail', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id'
        }
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        }
    }
  });
  
  orderDetail.belongsTo(sequelize.models.order, { as: 'order' });
  orderDetail.belongsTo(sequelize.models.product, { as: 'product' });
  
  return orderDetail;
};
