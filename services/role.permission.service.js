'use strict';

module.exports = function setupRolePermissionService(dependencies) {

  const rolePermissionModel = dependencies.rolePermissionModel;
  const permissionService = dependencies.permissionService;

  async function getPermissionsByRoles(roles) {
    return await Promise.all(roles.map(r => getPermissionsRoleModel(r)));
  }

  async function getPermissionsByRoleId(roleId) {
    const permissions = await rolePermissionModel.findAll({ where: { roleId } });
    return await Promise.all(permissions.map(pe => permissionService.findById(pe.permissionId)));
  }

  function getPermissionsModel(permissions) {
    const permissionsList = [];
    permissions.map(pe => permissionsList.push(pe.name));
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
