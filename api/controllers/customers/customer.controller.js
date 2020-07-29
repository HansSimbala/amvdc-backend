'use strict';

const setupBaseController = require('./../base.controller');
const serviceContainer = require('./../../../services/service.container');

let baseController = new setupBaseController();

const post = async (request, response) => {
  let responseCode;
  let responseData;
  try {
    const customerService = await serviceContainer('customer');
    const customer = {
      name: request.body.name && request.body.name.trim(),
      lastName: request.body.lastName && request.body.lastName.trim(),
      birthdate: request.body.birthdate && request.body.birthdate.trim(),
      documentTypeId: request.body.documentTypeId && parseInt(request.body.documentTypeId),
      document: request.body.document && request.body.document.trim(),
      contactNumber: request.body.contactNumber && request.body.contactNumber.trim(),
      gender: request.body.gender && request.body.gender.trim()
    };
    const customerData = await customerService.create(customer);
    responseCode = customerData.responseCode;
    responseData = baseController.getSuccessResponse(customerData.data, customerData.message);
  } catch (err) {
    console.error('Error ' + err);
    responseCode = 500;
    responseData = baseController.getErrorResponse('Error');
  }
  return response.status(responseCode).json(responseData);
};

module.exports = {
  post
};
