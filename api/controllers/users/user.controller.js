'use strict';

const setupBaseController = require('./../base.controller');
const serviceContainer = require('./../../../services/service.container');

let baseController = new setupBaseController();

const get = async (request, response) => {
    let responseCode;
    let responseData;
    try {
        // Inject services
        const userService = await serviceContainer('user');
        // Get user
        let userData = await userService.findById(request.params.id);
        // Return data
        responseCode = userData.responseCode;
        responseData = baseController.getSuccessResponse(userData.data, userData.message);
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
        const contributedService = await serviceContainer('contributed');
        const user = {
            fullName: request.body.fullName && request.body.fullName.trim(),
            email: request.body.email && request.body.email.trim(),
            password: request.body.password && request.body.password.trim()
        };
        const userData = await contributedService.createUser(user);
        responseCode = userData.responseCode;
        responseData = baseController.getSuccessResponse(userData.data, userData.message);
    } catch (err) {
        console.error('Error' + err);
        responseCode = 500;
        responseData = baseController.getErrorResponse('Error');
    }
    return response.status(responseCode).json(responseData);
};

module.exports = {
    get,
    post
};
