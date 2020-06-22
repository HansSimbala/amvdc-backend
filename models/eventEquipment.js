'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupEventEquipmentModel(config) {
  const sequelize = setupDatabase(config);

  const eventEquipment = sequelize.define('eventEquipment', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    eventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'events',
          key: 'id'
        }
    },
    equipmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'equipment',
          key: 'id'
        }
    }
  });
  
  eventEquipment.belongsTo(sequelize.models.event, { as: 'event' });
  eventEquipment.belongsTo(sequelize.models.equipment, { as: 'equipment' });
  
  return eventEquipment;
};
