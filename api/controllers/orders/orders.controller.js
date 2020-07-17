'use strict';

const setupBaseController = require('./../base.controller');
const serviceContainer = require('./../../../services/service.container');

let baseController = new setupBaseController();

const get = async (request, response) => {
  let responseCode;
  let responseData;
  try {
    const orderService = await serviceContainer('order');
    let ordersData = await orderService.doList();
    console.log("Here"+JSON.stringify(ordersData));
    responseCode = ordersData.responseCode;
    responseData = baseController.getSuccessResponse(ordersData.data, ordersData.message);
  } catch (err) {
    console.error('Error: ', err);
    responseCode = 500;
    responseData = baseController.getErrorResponse('Error');
  }
  return response.status(responseCode).json(responseData);
};

module.exports = {
  get
};
