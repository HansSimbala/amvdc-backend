'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupUserModel(config) {
  const sequelize = setupDatabase(config);

  const user = sequelize.define('user', {
    username: {
      type: Sequelize.STRING(50),
      allowNull: true,
      unique: true
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
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
  user.belongsTo(sequelize.models.person, { as: 'person' });
  return user;
};
