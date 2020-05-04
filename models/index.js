'use strict';

const setupDatabase = require('./database');

const setupCategoryModel = require('./category');
const setupDocumentTypeModel = require('./documentType');
const setupPersonModel = require('./person');
const setupProductModel = require('./product');
const setupUserModel = require('./user');

module.exports = async function (setup = false) {

  const config = require('./../environment/development.json');
  const dbInstance = setupDatabase(config);

  const categoryModel = setupCategoryModel(config);
  const documentTypeModel = setupDocumentTypeModel(config);
  const personModel = setupPersonModel(config);
  const productModel = setupProductModel(config);
  const userModel = setupUserModel(config);

  await dbInstance.authenticate();

  if (setup) {
    await dbInstance.sync({ force: true });
  }

  return {
    categoryModel,
    documentTypeModel,
    personModel,
    productModel,
    userModel
  };
};
