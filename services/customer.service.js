'use strict';

const setupBaseService = require('./base.service');

module.exports = function setupCustomerService(customerModel, personService) {
  let baseService = new setupBaseService();

  async function create(customer) {
    await customerModel.create(customer);
    return baseService.getServiceResponse(200, 'Success', {});
  }

  async function findById(id) {
    return await customerModel.findByPk(id);
  }

  return {
    create,
    findById
  };
}
