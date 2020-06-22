'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupCustomerModel(config) {
  const sequelize = setupDatabase(config);

  const customer = sequelize.define('customer', {
    personId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'people',
          key: 'id'
        }
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  });
  
  customer.belongsTo(sequelize.models.person, { as: 'person' });
  
  return customer;
};
