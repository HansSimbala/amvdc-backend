'use strict';

const permission = require("../models/permission");
const p = require("proxyquire");

module.exports = function setupRolePermissionService(dependencies) {

  const rolePermissionModel = dependencies.rolePermissionModel;
  const permissionService = dependencies.permissionService;

  async function getPermissionsByRoles(roles) {
    return await Promise.all(roles.map(r => getPermissionsRoleModel(r)));
  }

  async function getPermissionsByRoleId(roleId) {
    const permissions = await rolePermissionModel.findAll({ where: { roleId } });
    return await Promise.all(permissions.map(p => permissionService.findById(p.permissionId)));
  }

  function getPermissionsModel(permissions) {
    const permissionsList = [];
    permissions.map(p => permissionsList.push(p.name));
    return permissionsList;
  }

  async function getPermissionsRoleModel(role) {
    const permissions = await getPermissionsByRoleId(role.id);
    const permissionsModel = getPermissionsModel(permissions);
    return {
      id: role.id,
      name: role.name,
      permissions: permissionsModel
    };
  }

  return {
    getPermissionsByRoles
  };
}
