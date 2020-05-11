'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupPermissionRoleModel(config) {
    const sequelize = setupDatabase(config);

    const roleUser = sequelize.define('roleUser', {
        roleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'roles',
                key: 'id'
            }
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    }, {
        tableName: 'role_user'
    });
    roleUser.belongsTo(sequelize.models.role, { as: 'role' });
    roleUser.belongsTo(sequelize.models.user, { as: 'user' });
    return roleUser;
};
