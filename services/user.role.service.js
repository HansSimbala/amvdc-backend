'use strict';

module.exports = function setupUserRoleService(dependencies) {
  
  const userRoleModel = dependencies.userRoleModel;
  const roleService = dependencies.roleService;

  async function getRolesByUserId(userId) {
    const roles = await roleService.findAll();
    const userRoles = await userRoleModel.findAll({ where: { userId } });
    return roles.filter(a => userRoles.some(b => a.id === b.roleId));
  }

  return {
    getRolesByUserId
  };
}
