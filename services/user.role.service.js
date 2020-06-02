'use strict';

const setupBaseService = require('./base.service');

module.exports = function setupUserRoleService(models) {
  let baseService = new setupBaseService();

  const userRoleModel = models.userRoleModel;
  const userModel = models.userModel;
  const roleModel = models.roleModel;

  async function getRolesByUser(userId) {
    const userRoles = await userRoleModel.findAll({
      attributes: ['roleId'],
      where: {
        userId: userId
      }
    });
    console.log(JSON.stringify(userRoles));
    return userRoles;
  }

  return {
    getRolesByUser
  };
}
