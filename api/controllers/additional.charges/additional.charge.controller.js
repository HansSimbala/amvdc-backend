'use strict';

const setupBaseController = require('./../base.controller');
const serviceContainer = require('./../../../services/service.container');

let baseController = new setupBaseController();

const post = async (request, response) => {
    let responseCode;
    let responseData;
    try {
        const additionalChargeService = await serviceContainer('additionalCharge');
        const additionalCharge = {
            missingBottlesQuantity: request.body.missingBottlesQuantity && parseInt(request.body.missingBottlesQuantity),
            missingBoxQuantity: request.body.missingBoxQuantity && parseInt(request.body.missingBoxQuantity)
        };
        const additionalChargeData = await additionalChargeService.create(additionalCharge);
        responseCode = additionalChargeData.responseCode;
        responseData = baseController.getSuccessResponse(additionalChargeData.data, additionalChargeData.message);
    } catch (err) {
        console.error('Error' + err);
        responseCode = 500;
        responseData = baseController.getErrorResponse('Error');
    }
    return response.status(responseCode).json(responseData);
};

module.exports = {
    post
};
