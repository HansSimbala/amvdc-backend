'use strict';

const setupBaseService = require('./base.service');

module.exports = function setupPermissionService(permissionModel) {
  let baseService = new setupBaseService();

  async function create(permission) {
    await permissionModel.create(permission);
    return baseService.getServiceResponse(200, 'Success', {});
  }

  async function findById(id) {
    const permission = await permissionModel.findByPk(id);
    return permission;
  }

  return {
    create,
    findById
  };
}
