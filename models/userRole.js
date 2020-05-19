'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupUserRoleModel(config) {
    const sequelize = setupDatabase(config);

    const userRole = sequelize.define('userRole', {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        roleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'roles',
                key: 'id'
            }
        }
    });
    userRole.belongsTo(sequelize.models.user, { as: 'user' });
    userRole.belongsTo(sequelize.models.role, { as: 'role' });
    return userRole;
};
