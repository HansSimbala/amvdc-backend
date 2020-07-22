'use strict';

const setupBaseService = require('./base.service');

module.exports = function setupRolePermissionService(models) {
  let baseService = new setupBaseService();

  const rolePermissionModel = models.rolePermissionModel;

  async function getPermissionsByRole(roleId) {
    const rolePermissions = await rolePermissionModel.findAll({
        attributes: ['permissionId'],
        where: {
          roleId
        }
    });
    console.log(JSON.stringify(rolePermissions));    
    return rolePermissions;
  }

  async function getPermissionsByRoles(userRoles) {
    const permissionByRole = [];
    for (let index = 0; index < userRoles.length; index++) {
      let userRole = JSON.parse(JSON.stringify(userRoles[index]));
      let permissions = await getPermissionsByRole(userRole.roleId);
      userRole = {...userRole, permissions};
      permissionByRole.push(userRole);
    }
    console.log(JSON.stringify(permissionByRole));
    return permissionByRole;
  }

  return {
    getPermissionsByRoles
  };
}
