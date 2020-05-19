'use strict';

const bcrypt = require('bcryptjs');
const setupBaseService = require('./base.service');

module.exports = function setupAuthenticationService(userModel) {
  const baseService = new setupBaseService();

  async function login(data) {
    const emailExists = await userModel.findOne({ where: { email: data.email } });
    const passwordMatch = !emailExists ? false : await bcrypt.compare(data.password, emailExists.password);
    console.log(passwordMatch);
    if(!emailExists || !passwordMatch) {
        return baseService.getServiceResponse(404, 'Not found', {});
    }
    return baseService.getServiceResponse(200, 'Success', {});
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
