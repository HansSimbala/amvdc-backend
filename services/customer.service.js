'use strict';

const setupBaseService = require('./base.service');

module.exports = function setupCustomerService(customerModel, personModel) {
  let baseService = new setupBaseService();

  async function create(customer) {
    await customerModel.create(customer);
    return baseService.getServiceResponse(200, 'Success', {});
  }

  async function findById(id) {
    const customer = await customerModel.findByPk(id);
    const person = await personModel.findByPk(customer.id);
    return {
      id: customer.id,
      name: person.name,
      lastName: person.lastName,
      birthdate: person.birthdate
    };
  }

  return {
    create,
    findById
  };
}
