'use strict';

const setupBaseController = require('./../base.controller');
const serviceContainer = require('./../../../services/service.container');

let baseController = new setupBaseController();

const get = async (request, response) => {
  let responseCode;
  let responseData;
  try {
    const orderService = await serviceContainer('order');
    let orderData = await orderService.findById(request.params.id);
    responseCode = orderData.responseCode;
    responseData = baseController.getSuccessResponse(orderData.data, orderData.message);
  } catch (err) {
    console.error('Error: ', err);
    responseCode = 500;
    responseData = baseController.getErrorResponse('Error');
  }
  return response.status(responseCode).json(responseData);
};

const post = async (request, response) => {
  let responseCode;
  let responseData;
  try {
    const orderService = await serviceContainer('order');
    const order = {
      shippingDate: request.body.shippingDate && request.body.shippingDate.trim(),
      customerId: request.body.customerId && parseInt(request.body.customerId),
      locationId: request.body.locationId && parseInt(request.body.locationId),
      orderTypeId: request.body.orderTypeId && parseInt(request.body.orderTypeId),
      eventId: request.body.eventId && parseInt(request.body.eventId),
    };
    const orderData = await orderService.create(order);
    responseCode = orderData.responseCode;
    responseData = baseController.getSuccessResponse(orderData.data, orderData.message);
  } catch (err) {
    console.error('Error ' + err);
    responseCode = 500;
    responseData = baseController.getErrorResponse('Error');
  }
  return response.status(responseCode).json(responseData);
};

module.exports = {
  get,
  post,
};
