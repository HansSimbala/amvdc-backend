'use strict';

const setupBaseService = require('./base.service');

module.exports = function setupLocationService(locationModel) {
  let baseService = new setupBaseService();

  async function create(location) {
    await locationModel.create(location);
    return baseService.getServiceResponse(200, 'Success', {});
  }

  async function findById(id) {
    return await locationModel.findByPk(id);
  }

  return {
    create,
    findById
  };
}
