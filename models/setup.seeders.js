const constants = require('./../services/constants');
const faker = require('faker');

//#region Helpers
function getCategories() {
  return [
    constants.beerCategory,
    constants.bottledWaterCategory,
    constants.softDrinkCategory
  ]
}
function getDocumentTypes() {
  return [
    constants.dniDocumentType,
    constants.foreignCardDocumentType,
    constants.passportDocumentType
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
    if (documentTypeId === constants.dniDocumentType.id) {
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

module.exports = {
  seedCategories,
  seedDocumentTypes,
  seedPeople
};
