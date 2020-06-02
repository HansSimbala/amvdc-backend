'use strict';

const bcrypt = require('bcryptjs');
const setupBaseService = require('./base.service');

module.exports = function setupAuthenticationService(dependencies) {
  let baseService = new setupBaseService();

  const userModel = dependencies.userModel;
  const userRoleService = dependencies.userRoleService;
  const rolePermissionService = dependencies.rolePermissionService;

  async function login(data) {
    const user = await userModel.findOne({ where: { email: data.email } });
    const passwordMatch = !user ? false : await bcrypt.compare(data.password, user.password);

    if(!passwordMatch) {
        return baseService.getServiceResponse(404, 'Not found', {});
    }
    const userData = await getUserData(user);
    
    return baseService.getServiceResponse(200, 'Success', userData);
  }

  async function getUserData(user) {
    const userRoles = await userRoleService.getRolesByUser(user.id);
    const rolesPermissions = await rolePermissionService.getPermissionsByRoles(userRoles);

    return getSimpleUserDataModel(user, rolesPermissions);
  }

  function getSimpleUserDataModel(user, roles) {
    return {
      id: user.id,
      user: user.username,
      personId: user.personId,
      roles
    };
  }

  function checkLogin(email, password) {
    return baseService.getServiceResponse(200, 'Success', {});
  }

  function changePassword(password) {
    return baseService.getServiceResponse(200, 'Success', {});
  }

  function resetPassword(email) {
    return baseService.getServiceResponse(200, 'Success', {});
  }

  function logout() {
    return baseService.getServiceResponse(200, 'Success', {});
  }

  return {
    login,
    checkLogin,
    changePassword,
    logout,
    resetPassword
  };
};
