'use strict';

const setupDatabase = require('./../models');
const setupAuthenticationService = require('./authentication.service');
const setupContributedService = require('./contributed.service');
const setupDocumentTypeService = require('./document.type.service');
const setupPersonService = require('./person.service');
const setupUserService = require('./user.service');

module.exports = async function () {
  const dbInstance = await setupDatabase();
  const authenticationService = setupAuthenticationService(dbInstance.userModel);
  const personService = setupPersonService(dbInstance.personModel);
  const documentTypeService = setupDocumentTypeService(dbInstance.documentTypeModel);
  const userService = setupUserService(dbInstance.userModel);

  const contributedService = setupContributedService({ personService, personModel: dbInstance.personModel, userModel: dbInstance.userModel });

  return {
    authenticationService,
    contributedService,
    documentTypeService,
    personService,
    userService
  };
};
