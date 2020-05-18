const constants = require('./../services/constants');
const faker = require('faker');

//#region Helpers
function getCategories() {
  return [
    constants.BEER_CATEGORY,
    constants.BOTTLED_WATER_CATEGORY,
    constants.SOFT_DRINK_CATEGORY
  ]
}

function getDocumentTypes() {
  return [
    constants.DNI_DOCUMENT_TYPE,
    constants.FOREIGN_CARD_DOCUMENT_TYPE,
    constants.PASSPORT_DOCUMENT_TYPE
  ]
}

function getPermissions() {
  return [
    constants.ORDERS_PERMISSION,
    constants.CASH_SALE_PERMISSION,
    constants.CONSIGNMENT_SALE_PERMISSION,
    constants.CREDIT_SALE_PERMISSION
  ]
}

function getRoles() {
  return [
    constants.ADMINISTRATOR,
    constants.DEBT_COLLECTOR,
    constants.DELIVERY_DRIVER
  ]
}
//#endregion

async function seedCategories(model) {
  await model.bulkCreate(getCategories());
}

async function seedDocumentTypes(model) {
  await model.bulkCreate(getDocumentTypes());
}

async function seedPeople(model) {
  const people = [];
  for (let index = 0; index < 50; index++) {
    const documentTypeId = faker.random.arrayElement(getDocumentTypes()).id;
    let document = '';
    if (documentTypeId === constants.DNI_DOCUMENT_TYPE.id) {
      document = faker.random.number({ min: 10000000, max: 99999999 });;
    } else {
      document = faker.random.alphaNumeric(12).toUpperCase();
    }
    people.push({
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      birthdate: faker.date.past(),
      document,
      documentTypeId,
      createdAt: faker.date.past(),
      updatedAt: new Date()
    });
  }
  await model.bulkCreate(people);
}

async function seedPermissions(model) {
  await model.bulkCreate(getPermissions());
}

async function seedRoles(model) {
  await model.bulkCreate(getRoles());
}

module.exports = {
  seedCategories,
  seedDocumentTypes,
  seedPeople,
  seedPermissions,
  seedRoles
};
