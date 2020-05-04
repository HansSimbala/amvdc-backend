'use strict';

class baseController {
  constructor() {
    this.successStatus =  'OK';
    this.errorStatus = 'ERROR';
    this.responseData = {
      status: '',
      data: {},
      message: ''
    };
  }

  getSuccessResponse(data, message) {
    this.responseData.status = this.successStatus;
    this.responseData.data = data;
    this.responseData.message = message;
    return this.responseData;
  }

  getErrorResponse(message) {
    this.responseData.status = this.errorStatus;
    this.responseData.data = {};
    this.responseData.message = message;
    return this.responseData;
  }
}

module.exports = baseController;
