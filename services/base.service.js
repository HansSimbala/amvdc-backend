'use strict';

class baseService {
  constructor() {
    this.returnData = {
      status: false,
      data: {},
      message: '',
      responseCode: 200
    };
  }

  getServiceResponse(responseCode, message, data) {
    this.returnData.message = message;
    this.returnData.responseCode = responseCode;
    this.returnData.data = data;
    return this.returnData;
  }
}

module.exports = baseService;
