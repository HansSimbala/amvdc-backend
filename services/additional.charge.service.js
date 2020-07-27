'use strict';

const setupBaseService = require('./base.service');

module.exports = function setupAdditionalChargeService(additionalChargeModel) {
  let baseService = new setupBaseService();

  async function create(additionalCharge) {
    const getAdditionalCharge = await additionalChargeModel.create(additionalCharge);
    return baseService.getServiceResponse(200, 'Success', getAdditionalCharge);
  }

  return {
    create
  };
}
