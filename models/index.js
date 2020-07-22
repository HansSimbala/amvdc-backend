'use strict';

const setupDatabase = require('./database');

const setupCategoryModel = require('./category');
const setupProductModel = require('./product');
const setupInventoryModel = require('./inventory');
const setupDocumentTypeModel = require('./documentType');
const setupPersonModel = require('./person');
const setupPermissionModel = require('./permission');
const setupRoleModel = require('./role');
const setupRolePermissionModel = require('./rolePermission');
const setupUserModel = require('./user');
const setupUserRoleModel = require('./userRole');
const setupCustomerModel = require('./customer');
const setupEventModel = require('./event');
const setupEquipmentModel = require('./equipment');
const setupEventEquipmentModel = require('./eventEquipment');
const setupLocationModel = require('./location');
const setupOrderTypeModel = require('./orderType');
const setupOrderStateModel = require('./orderState');
const setupOrderModel = require('./order');
const setupOrderDetailModel = require('./orderDetail');

module.exports = async function (setup = false) {

  const config = require('./../environment/production.json');
  const dbInstance = setupDatabase(config);

  const categoryModel = setupCategoryModel(config);
  const productModel = setupProductModel(config);
  const inventoryModel = setupInventoryModel(config);
  const documentTypeModel = setupDocumentTypeModel(config);
  const personModel = setupPersonModel(config);
  const permissionModel = setupPermissionModel(config);
  const roleModel = setupRoleModel(config);
  const rolePermissionModel = setupRolePermissionModel(config);
  const userModel = setupUserModel(config);
  const userRoleModel = setupUserRoleModel(config);
  const customerModel = setupCustomerModel(config);
  const eventModel = setupEventModel(config);
  const equipmentModel = setupEquipmentModel(config);
  const eventEquipmentModel = setupEventEquipmentModel(config);
  const locationModel = setupLocationModel(config);
  const orderTypeModel = setupOrderTypeModel(config);
  const orderStateModel = setupOrderStateModel(config);
  const orderModel = setupOrderModel(config);
  const orderDetailModel = setupOrderDetailModel(config);

  await dbInstance.authenticate();

  if (setup) {
    await dbInstance.sync({ force: true });
  }

  return {
    categoryModel,
    productModel,
    inventoryModel,
    documentTypeModel,
    personModel,
    permissionModel,
    roleModel,
    rolePermissionModel,
    userModel,
    userRoleModel,
    customerModel,
    eventModel,
    equipmentModel,
    eventEquipmentModel,
    locationModel,
    orderTypeModel,
    orderStateModel,
    orderModel,
    orderDetailModel
  };
};
