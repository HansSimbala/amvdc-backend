const bcrypt = require('bcryptjs');
const faker = require('faker');

const constants = require('./../services/constants');

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

function getOrderStates() {
  return [
    constants.CONFIRMED_ORDER_STATE,
    constants.CANCELLED_ORDER_STATE,
    constants.SHIPPED_ORDER_STATE,
    constants.EN_ROUTE_ORDER_STATE,
    constants.ARRIVED_ORDER_STATE,
    constants.COMPLETED_ORDER_STATE
  ]
}

function getOrderTypes() {
  return [
    constants.CASH_ORDER_TYPE,
    constants.CONSIGNMENT_ORDER_TYPE
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
    constants.ADMINISTRATE_ROLE,
    constants.COLLECT_ROLE,
    constants.DISTRIBUTE_ROLE
  ]
}
//#endregion

async function seedCategories(model) {
  await model.bulkCreate(getCategories());
}

async function seedDocumentTypes(model) {
  await model.bulkCreate(getDocumentTypes());
}

async function seedOrderStates(model) {
  await model.bulkCreate(getOrderStates());
}

async function seedOrderTypes(model) {
  await model.bulkCreate(getOrderTypes());
}

async function seedPeople(model) {
  const people = [];

  // Adding default people
  people.push({ ...constants.ADMIN_PERSON, documentTypeId: constants.DNI_DOCUMENT_TYPE.id });
  people.push({ ...constants.DELIVERY_PERSON, documentTypeId: constants.DNI_DOCUMENT_TYPE.id });

  for (let index = people.length + 1; index < 20; index++) {
    const documentTypeId = faker.random.arrayElement(getDocumentTypes()).id;
    let document = '';
    if (documentTypeId === constants.DNI_DOCUMENT_TYPE.id) {
      document = faker.random.number({ min: 10000000, max: 99999999 });;
    } else {
      document = faker.random.alphaNumeric(12).toUpperCase();
    }
    people.push({
      id: index,
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

async function seedRolePermissions(model) {
  const rolePermissions = [];

  rolePermissions.push({ roleId: constants.ADMINISTRATE_ROLE.id, permissionId: constants.ORDERS_PERMISSION.id, createdAt: faker.date.past(), updatedAt: new Date() });
  rolePermissions.push({ roleId: constants.DISTRIBUTE_ROLE.id, permissionId: constants.ORDERS_PERMISSION.id, createdAt: faker.date.past(), updatedAt: new Date() });
  rolePermissions.push({ roleId: constants.COLLECT_ROLE.id, permissionId: constants.CASH_SALE_PERMISSION.id, createdAt: faker.date.past(), updatedAt: new Date() });
  rolePermissions.push({ roleId: constants.COLLECT_ROLE.id, permissionId: constants.CREDIT_SALE_PERMISSION.id, createdAt: faker.date.past(), updatedAt: new Date() });
  rolePermissions.push({ roleId: constants.COLLECT_ROLE.id, permissionId: constants.CONSIGNMENT_SALE_PERMISSION.id, createdAt: faker.date.past(), updatedAt: new Date() });

  await model.bulkCreate(rolePermissions);
}

async function seedUsers(model) {
  const users = [];

  const generatePassword = async (password) => {
    return await bcrypt.hash(password, constants.BCRYPT_WORK_FACTOR);
  }

  // ADMIN
  users.push({ username: constants.ADMIN_USER.username , email: constants.ADMIN_USER.email, password: await generatePassword(constants.ADMIN_USER.password), personId: constants.ADMIN_PERSON.id, status: constants.ACTIVE_STATUS.id, createdAt: faker.date.past(), updatedAt: new Date() });
  // DELIVERY
  users.push({ username: constants.DELIVERY_USER.username , email: constants.DELIVERY_USER.email, password: await generatePassword(constants.DELIVERY_USER.password), personId: constants.DELIVERY_PERSON.id, status: constants.ACTIVE_STATUS.id, createdAt: faker.date.past(), updatedAt: new Date() });
  
  await model.bulkCreate(users);
}

async function seedUserRoles(model) {
  const userRoles = [];

  // ADMIN
  userRoles.push({ userId: constants.ADMIN_USER.id, roleId: constants.COLLECT_ROLE.id, createdAt: faker.date.past(), updatedAt: new Date() });
  userRoles.push({ userId: constants.ADMIN_USER.id, roleId: constants.DISTRIBUTE_ROLE.id, createdAt: faker.date.past(), updatedAt: new Date() });
  // DELIVERY
  userRoles.push({ userId: constants.DELIVERY_USER.id, roleId: constants.DISTRIBUTE_ROLE.id, createdAt: faker.date.past(), updatedAt: new Date() });

  await model.bulkCreate(userRoles);
}

module.exports = {
  seedCategories,
  seedDocumentTypes,
  seedOrderStates,
  seedOrderTypes,
  seedPeople,
  seedPermissions,
  seedRoles,
  seedRolePermissions,
  seedUsers,
  seedUserRoles
};
