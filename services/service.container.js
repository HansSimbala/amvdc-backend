'use strict';

const setupServices = require('./');

let services;

module.exports = async function serviceContainer(serviceName) {
  if (!services) {
    services = await setupServices();
  }
  // Return requested service
  switch (serviceName) {
    case 'authentication':
      return services.authenticationService;
    case 'contributed':
      return services.contributedService;
    case 'documentType':
      return services.documentTypeService;
    case 'person':
      return services.personService;
    case 'user':
      return services.userService;
  }
}