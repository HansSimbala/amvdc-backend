'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupPersonModel(config) {
  const sequelize = setupDatabase(config);
  const person = sequelize.define('person', {
    name: {
      type: Sequelize.STRING(25),
      allowNull: true
    },
    lastName: {
      type: Sequelize.STRING(25),
      allowNull: true
    },
    birthdate: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    documentTypeId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'documentTypes',
        key: 'id'
      }
    },
    document: {
      type: Sequelize.STRING(25),
      allowNull: true,
      unique: true
    }
  });
  person.belongsTo(sequelize.models.documentType, { as: 'documentType' });
  return person;
};
