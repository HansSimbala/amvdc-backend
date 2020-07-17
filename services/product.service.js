'use strict';

const setupBaseService = require('./base.service');

module.exports = function setupProductService(productModel) {
  let baseService = new setupBaseService();

  async function create(product) {
    await productModel.create(product);
    return baseService.getServiceResponse(200, 'Success', {});
  }

  async function findById(id) {
    return await productModel.findByPk(id);
  }

  return {
    create,
    findById
  };
}
