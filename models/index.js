'use strict';

const setupDatabase = require('./database');

const setupCategoryModel = require('./category');
const setupDocumentTypeModel = require('./documentType');
const setupPermissionModel = require('./permission');
const setupRoleModel = require('./role');
const setupProductModel = require('./product');
const setupInventoryModel = require('./inventory');
const setupPermissionRoleModel = require('./permissionRole');
const setupPersonModel = require('./person');
const setupCustomerModel = require('./customer');
const setupOrderModel = require('./order');
const setupOrderDetailModel = require('./orderDetail');
const setupUserModel = require('./user');
const setupRoleUserModel = require('./roleUser');

module.exports = async function (setup = false) {

  const config = require('./../environment/development.json');
  const dbInstance = setupDatabase(config);

  const categoryModel = setupCategoryModel(config);
  const documentTypeModel = setupDocumentTypeModel(config);
  const permissionModel = setupPermissionModel(config);
  const roleModel = setupRoleModel(config);
  const productModel = setupProductModel(config);
  const inventoryModel = setupInventoryModel(config);
  const permissionRoleModel = setupPermissionRoleModel(config);
  const personModel = setupPersonModel(config);
  const customerModel = setupCustomerModel(config);
  const orderModel = setupOrderModel(config);
  const orderDetailModel = setupOrderDetailModel(config);
  const userModel = setupUserModel(config);
  const roleUserModel = setupRoleUserModel(config);

  await dbInstance.authenticate();

  if (setup) {
    await dbInstance.sync({ force: true });
  }

  return {
    categoryModel,
    documentTypeModel,
    permissionModel,
    roleModel,
    productModel,
    inventoryModel,
    permissionRoleModel,
    personModel,
    customerModel,
    orderModel,
    orderDetailModel,
    userModel,
    roleUserModel
  };
};
