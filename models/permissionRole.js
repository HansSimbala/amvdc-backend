'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupPermissionRoleModel(config) {
    const sequelize = setupDatabase(config);

    const permissionRole = sequelize.define('permissionRole', {
        permissionId: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'permissions',
                key: 'id'
            }
        },
        roleId: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'roles',
                key: 'id'
            }
        }
    }, {
        tableName: 'permission_role'
    });
    permissionRole.belongsTo(sequelize.models.permission, { as: 'permission' });
    permissionRole.belongsTo(sequelize.models.role, { as: 'role' });
    return permissionRole;
};
