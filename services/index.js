'use strict';

const setupDatabase = require('./../models');
const setupAuthenticationService = require('./authentication.service');
const setupContributedService = require('./contributed.service');
const setupDocumentTypeService = require('./document.type.service');
const setupPersonService = require('./person.service');
const setupUserService = require('./user.service');
const setupUserRoleService = require('./user.role.service');
const setupRolePermissionService = require('./role.permission.service');

module.exports = async function () {
  const dbInstance = await setupDatabase();
  const personService = setupPersonService(dbInstance.personModel);
  const documentTypeService = setupDocumentTypeService(dbInstance.documentTypeModel);
  const userService = setupUserService(dbInstance.userModel);
  const userRoleService = setupUserRoleService({ userRoleModel: dbInstance.userRoleModel, userModel: dbInstance.userModel, roleModel: dbInstance.roleModel });
  const rolePermissionService = setupRolePermissionService({ rolePermissionModel: dbInstance.rolePermissionModel, roleModel: dbInstance.roleModel, permissionModel: dbInstance.permissionModel });

  const authenticationService = setupAuthenticationService({ userModel: dbInstance.userModel, userRoleService, rolePermissionService });
  const contributedService = setupContributedService({ personService, personModel: dbInstance.personModel, userModel: dbInstance.userModel });

  return {
    authenticationService,
    contributedService,
    documentTypeService,
    personService,
    userService
  };
};
