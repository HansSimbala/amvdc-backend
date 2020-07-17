'use strict';

const setupBaseController = require('./../base.controller');
const serviceContainer = require('./../../../services/service.container');

let baseController = new setupBaseController();

const post = async (request, response) => {
  let responseCode;
  let responseData;
  try {
    const locationService = await serviceContainer('location');
    const location = {
      address: request.body.address && request.body.address.trim(),
      reference: request.body.reference && request.body.reference.trim(),
      latitude: request.body.latitude && request.body.latitude.trim(),
      longitude: request.body.longitude && request.body.longitude.trim()
    };
    const locationData = await locationService.create(location);
    responseCode = locationData.responseCode;
    responseData = baseController.getSuccessResponse(locationData.data, locationData.message);
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
