'use strict';

const setupBaseController = require('./../base.controller');
const serviceContainer = require('./../../../services/service.container');

const constants = require('./../../../services/constants');

let baseController = new setupBaseController();

const get = async (request, response) => {
  let responseCode;
  let responseData;
  try {
    const orderService = await serviceContainer('order');
    const requestQuery = {
      orderStateId: parseInt(request.query.orderStateId) || constants.CONFIRMED_ORDER_STATE.id,
      latitude: parseFloat(request.query.latitude) || constants.PREMISES_LOCATION.latitude,
      longitude: parseFloat(request.query.longitude) || constants.PREMISES_LOCATION.longitude
    };
    let ordersData = await orderService.doList(requestQuery);
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
