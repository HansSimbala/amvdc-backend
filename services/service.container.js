'use strict';

const setupServices = require('./');

let services;

module.exports = async function serviceContainer(serviceName) {
  if (!services) {
    services = await setupServices();
  }
  // Return requested service
  switch (serviceName) {
    case 'additionalCharge':
      return services.additionalChargeService;
    case 'authentication':
      return services.authenticationService;
    case 'contributed':
      return services.contributedService;
    case 'customer':
      return services.customerService;
    case 'documentType':
      return services.documentTypeService;
    case 'location':
      return services.locationService;
    case 'order':
      return services.orderService;
    case 'person':
      return services.personService;
    case 'user':
      return services.userService;
  }
}