'use strict';

const setupBaseController = require('./../base.controller');
const serviceContainer = require('./../../../services/service.container');

let baseController = new setupBaseController();

const get = async (request, response) => {
  let responseCode;
  let responseData;
  try {
    // Inject services
    const personService = await serviceContainer('person');
    // Get the query parameters
    const limit = parseInt(request.query.limit) || 20;
    const offset = parseInt(request.query.offset) || 0;
    const query = request.query.query || '';
    const orderBy = parseInt(request.query.orderBy) || 1;
    const orderType = parseInt(request.query.orderType) || 1;
    // Get people
    const peopleData = await personService.doList({ limit, offset, query, orderBy, orderType });
    // Return the data
    responseCode = peopleData.responseCode;
    responseData = baseController.getSuccessResponse(peopleData.data, peopleData.message);
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
