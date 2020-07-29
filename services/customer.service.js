'use strict';

const setupBaseService = require('./base.service');

module.exports = function setupCustomerService(customerModel, personModel) {
  let baseService = new setupBaseService();

  async function create(customer) {
    const personWithExistingDocument = await documentExists(customer.document);
    if (personWithExistingDocument) {
      return baseService.getServiceResponse(400, 'Bad Request', {});
    } else {
      const createdPerson = await personModel.create(customer);
      const createdCustomer = await customerModel.create({ personId: createdPerson.id, status: true });
      return baseService.getServiceResponse(200, 'Success', createdCustomer);
    }
  }

  async function documentExists(document) {
    const person = await personModel.findOne({ where: { document } });
    if (person) {
      return true;
    } else {
      return false;
    }
  }

  async function findById(id) {
    const customer = await customerModel.findByPk(id);
    const person = await personModel.findByPk(customer.id);
    return {
      id: customer.id,
      name: person.name,
      lastName: person.lastName,
      contactNumber: person.contactNumber,
      birthdate: person.birthdate
    };
  }

  return {
    create,
    findById
  };
}
