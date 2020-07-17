'use strict';

const setupDatabase = require('./../models');
const setupAuthenticationService = require('./authentication.service');
const setupContributedService = require('./contributed.service');
const setupCustomerService = require('./customer.service');
const setupDocumentTypeService = require('./document.type.service');
const setupPersonService = require('./person.service');
const setupUserService = require('./user.service');
const setupUserRoleService = require('./user.role.service');
const setupRolePermissionService = require('./role.permission.service');
const setupLocationService = require('./location.service');
const setupOrderService = require('./order.service');
const setupOrderDetailService = require('./order.detail.service');
const setupProductService = require('./product.service');

module.exports = async function () {
  const dbInstance = await setupDatabase();
  const personService = setupPersonService(dbInstance.personModel);
  const documentTypeService = setupDocumentTypeService(dbInstance.documentTypeModel);
  const userService = setupUserService(dbInstance.userModel);
  const userRoleService = setupUserRoleService({ userRoleModel: dbInstance.userRoleModel, userModel: dbInstance.userModel, roleModel: dbInstance.roleModel });
  const rolePermissionService = setupRolePermissionService({ rolePermissionModel: dbInstance.rolePermissionModel, roleModel: dbInstance.roleModel, permissionModel: dbInstance.permissionModel });

  const authenticationService = setupAuthenticationService({ userModel: dbInstance.userModel, userRoleService, rolePermissionService });
  const contributedService = setupContributedService({ personService, personModel: dbInstance.personModel, userModel: dbInstance.userModel });

  const customerService = setupCustomerService(dbInstance.customerModel, personService);
  const locationService = setupLocationService(dbInstance.locationModel);
  const productService = setupProductService(dbInstance.productModel);
  const orderDetailService = setupOrderDetailService(dbInstance.orderDetailModel, productService);
  const orderService = setupOrderService({ customerService, locationService, orderDetailService, orderModel: dbInstance.orderModel });

  return {
    authenticationService,
    contributedService,
    documentTypeService,
    personService,
    userService,
    customerService,
    locationService,
    productService,
    orderService
  };
};
