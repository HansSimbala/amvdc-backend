'use strict';

const setupBaseService = require('./base.service');

module.exports = function setupRoleService(roleModel) {
  let baseService = new setupBaseService();

  async function create(role) {
    await roleModel.create(role);
    return baseService.getServiceResponse(200, 'Success', {});
  }

  async function findById(id) {
    const role = await roleModel.findByPk(id);
    return role;
  }

  return {
    create,
    findById
  };
}
