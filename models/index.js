'use strict';

const setupDatabase = require('./database');

const setupCategoryModel = require('./category');
const setupCustomerModel = require('./customer');
const setupDocumentTypeModel = require('./documentType');
const setupInventoryModel = require('./inventory');
const setupOrderModel = require('./order');
const setupOrderDetailModel = require('./orderDetail');
const setupPermissionModel = require('./permission');
const setupPermissionRoleModel = require('./permissionRole');
const setupPersonModel = require('./person');
const setupProductModel = require('./product');
const setupRoleModel = require('./role');
const setupRoleUserModel = require('./roleUser');
const setupUserModel = require('./user');

module.exports = async function (setup = false) {

  const config = require('./../environment/development.json');
  const dbInstance = setupDatabase(config);

  const categoryModel = setupCategoryModel(config);
  const customerModel = setupCustomerModel(config);
  const documentTypeModel = setupDocumentTypeModel(config);
  const inventoryModel = setupInventoryModel(config);
  const orderModel = setupOrderModel(config);
  const orderDetailModel = setupOrderDetailModel(config);
  const permissionModel = setupPermissionModel(config);
  const permissionRoleModel = setupPermissionRoleModel(config);
  const personModel = setupPersonModel(config);
  const productModel = setupProductModel(config);
  const roleModel = setupRoleModel(config);
  const roleUserModel = setupRoleUserModel(config);
  const userModel = setupUserModel(config);

  await dbInstance.authenticate();

  if (setup) {
    await dbInstance.sync({ force: true });
  }

  return {
    categoryModel,
    customerModel,
    documentTypeModel,
    inventoryModel,
    orderModel,
    orderDetailModel,
    permissionModel,
    permissionRoleModel,
    personModel,
    productModel,
    roleModel,
    roleUserModel,
    userModel
  };
};
