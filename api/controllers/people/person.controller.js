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
    // Get person
    let peopleData = await personService.findById(request.params.id);
    // Return data
    responseCode = peopleData.responseCode;
    responseData = baseController.getSuccessResponse(peopleData.data, peopleData.message);
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
    // Inject services
    const personService = await serviceContainer('person');
    // Get person from request body
    const person = {
      name: request.body.name && request.body.name.trim(),
      lastName: request.body.lastName && request.body.lastName.trim(),
      birthdate: request.body.birthdate && request.body.birthdate.trim(),
      documentTypeId: request.body.documentTypeId && parseInt(request.body.documentTypeId),
      document: request.body.document && request.body.document.trim(),
      contactNumber: request.body.contactNumber && request.body.contactNumber.trim()    
    };
    // Create person
    const personData = await personService.create(person);
    // Return the data
    responseCode = personData.responseCode;
    responseData = baseController.getSuccessResponse(personData.data, personData.message);
  } catch (err) {
    console.error('Error ' + err);
    responseCode = 500;
    responseData = baseController.getErrorResponse('Error');
  }
  return response.status(responseCode).json(responseData);
};

const put = async (request, response) => {
  let responseCode;
  let responseData;
  try {
    // Inject services
    const personService = await serviceContainer('person');
    // Get the person id from the route
    const personId = parseInt(request.params.id);
    // Get the person from the request body
    const person = {
      name: request.body.name && request.body.name.trim(),
      lastName: request.body.lastName && request.body.lastName.trim(),
      birthdate: request.body.birthdate && request.body.birthdate.trim(),
      documentTypeId: request.body.documentTypeId && parseInt(request.body.documentTypeId),
      document: request.body.document && request.body.document.trim()
    };
    // Modify person
    const personData = await personService.modify(personId, person);
    // Return the data
    responseCode = personData.responseCode;
    responseData = baseController.getSuccessResponse(personData.data, personData.message);
  } catch (err) {
    console.error('Error: ' + err);
    responseCode = 500;
    responseData = baseController.getErrorResponse('Error');
  }
  return response.status(responseCode).json(responseData);
};

module.exports = {
  get,
  post,
  put
};
