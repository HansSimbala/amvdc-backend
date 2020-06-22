'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupOrderModel(config) {
  const sequelize = setupDatabase(config);

  const order = sequelize.define('order', {
    shippingDate: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'id'
        }
    },
    locationId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'locations',
        key: 'id'
      }
    },
    orderStateId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'orderStates',
        key: 'id'
      }
    },
    orderTypeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'orderTypes',
        key: 'id'
      }
    },
    eventId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'events',
        key: 'id'
      }
    }
  });
  
  order.belongsTo(sequelize.models.customer, { as: 'customer' });
  order.belongsTo(sequelize.models.location, { as: 'location' });
  order.belongsTo(sequelize.models.orderState, { as: 'orderState' });
  order.belongsTo(sequelize.models.orderType, { as: 'orderType' });
  order.belongsTo(sequelize.models.event, { as: 'event' });
  
  return order;
};
