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

async function seedPeople(model) {
  const people = [];

  // Adding default people
  people.push({ ...constants.ADMIN_PERSON, documentTypeId: constants.DNI_DOCUMENT_TYPE.id });

  for (let index = 0; index < 20; index++) {
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

async function seedRolePermissions(model) {
  const rolePermission = [];

  rolePermission.push({ roleId: constants.ADMINISTRATE_ROLE.id, permissionId: constants.ORDERS_PERMISSION.id, createdAt: faker.date.past(), updatedAt: new Date() });
  rolePermission.push({ roleId: constants.DISTRIBUTE_ROLE.id, permissionId: constants.ORDERS_PERMISSION.id, createdAt: faker.date.past(), updatedAt: new Date() });
  rolePermission.push({ roleId: constants.COLLECT_ROLE.id, permissionId: constants.CASH_SALE_PERMISSION.id, createdAt: faker.date.past(), updatedAt: new Date() });
  rolePermission.push({ roleId: constants.COLLECT_ROLE.id, permissionId: constants.CREDIT_SALE_PERMISSION.id, createdAt: faker.date.past(), updatedAt: new Date() });
  rolePermission.push({ roleId: constants.COLLECT_ROLE.id, permissionId: constants.CONSIGNMENT_SALE_PERMISSION.id, createdAt: faker.date.past(), updatedAt: new Date() });

  await model.bulkCreate(rolePermission);
}

async function seedUsers(model) {
  const users = [];

  const generatePassword = async (password) => {
    return await bcrypt.hash(password, constants.BCRYPT_WORK_FACTOR);
  }

  users.push({ username: constants.ADMIN_USER.username , email: constants.ADMIN_USER.email, password: await generatePassword(constants.ADMIN_USER.password), personId: constants.ADMIN_USER.personId, status: constants.ACTIVE_STATUS.id, createdAt: faker.date.past(), updatedAt: new Date() });
  
  await model.bulkCreate(users);
}

module.exports = {
  seedCategories,
  seedDocumentTypes,
  seedPeople,
  seedPermissions,
  seedRoles,
  seedRolePermissions,
  seedUsers
};
