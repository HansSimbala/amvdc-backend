'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupRolePermissionModel(config) {
    const sequelize = setupDatabase(config);

    const rolePermission = sequelize.define('rolePermission', {
        roleId: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'roles',
                key: 'id'
            }
        },
        permissionId: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'permissions',
                key: 'id'
            }
        }
    });
    
    rolePermission.belongsTo(sequelize.models.role, { as: 'role' });
    rolePermission.belongsTo(sequelize.models.permission, { as: 'permission' });
    
    return rolePermission;
};
