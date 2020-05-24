'use strict';

const Sequelize = require('sequelize');

const setupBaseService = require('./base.service');
const constants = require('./constants');

const Op = Sequelize.Op;

module.exports = function setupPersonService(personModel) {
  let baseService = new setupBaseService();

  //#region Helpers
  function getOrderField(orderBy) {
    let qOrderBy;
    switch (orderBy) {
      case 1:
        qOrderBy = ['name'];
        break;
      case 2:
        qOrderBy = ['document'];
        break;
      case 3:
        qOrderBy = ['documentType', 'name'];
        break;
      default:
        qOrderBy = 'name';
        break;
    }
    return qOrderBy;
  }

  function getOrderType(orderType) {
    let qOrderType;
    switch (orderType) {
      case 1:
        qOrderType = 'ASC';
        break;
      case 2:
        qOrderType = 'DESC';
        break;
      default:
        qOrderType = 'ASC';
        break;
    }
    return qOrderType;
  }

  function getQueryWhereClause(queries) {
    return {
      [Op.or]: queries.map(q => {
        return { [Op.like]: `%${q}%` };
      })
    };
  }

  function getSimplePersonModel(model) {
    return {
      id: model.id,
      birthdate: model.birthdate,
      gender: model.gender,
      lastName: model.lastName,
      name: model.name
    };
  }
  //#endregion

  //#region Validators
  function validateBirthdate(birthdate, errors) {
    if (!birthdate) {
      errors.push('The birthdate field is required');
      return;
    }

    const parsedBirthdate = new Date(birthdate);
    const minDate = new Date('1900/01/01');
    const maxDate = Date.now();

    if (isNaN(parsedBirthdate)) {
      errors.push('Invalid birthdate format');
    } else if (parsedBirthdate < minDate || parsedBirthdate > maxDate) {
      errors.push('Invalid submitted birthdate');
    }
  }

  function validateDocument(documentTypeId, document, errors) {
    const dniRegex = /^[0-9]{1,8}$/;
    const passportRegex = /^([a-zA-Z0-9]){1,12}$/;
    const foreignCardRegex = /^([a-zA-Z0-9]){1,12}$/;
    if (!documentTypeId) {
      errors.push('The document field is required');
    } else if (![1, 2, 3].includes(documentTypeId)) {
      errors.push('Invalid submitted document type');
    } else if (documentTypeId === 1 && !dniRegex.test(document)) {
      errors.push('Invalid DNI format');
    } else if (documentTypeId === 2 && !passportRegex.test(document)) {
      errors.push('Invalid passport format');
    } else if (documentTypeId === 3 && !foreignCardRegex.test(document)) {
      errors.push('Invalid foreign card format');
    }
  }

  function validateGender(gender, errors) {
    if (!gender) {
      errors.push('The gender field is required');
    } else if (gender != (constants.maleGender.name || constants.femaleGender.name)) {
      errors.push('Invalid submitted gender');
    }
  }

  function validateLastName(lastName, errors) {
    const lastNameRegex = /^[a-zA-ZñÑ'\s]{1,25}$/;
    if (!lastName) {
      errors.push('The last name field is required');
    } else if (!lastNameRegex.test(lastName)) {
      errors.push('Invalid last name format');
    }
  }

  function validateName(name, errors) {
    const nameRegex = /^[a-zA-ZñÑ'\s]{1,25}$/;
    if (!name) {
      errors.push('The name field is required');
    } else if (!nameRegex.test(name)) {
      errors.push('Invalid name format');
    }
  }
  async function validatePersonCreate(person, errors) {
    // Validate if document exists
    const documentExists = await personModel.findOne({ where: { document: person.document } });
    if (documentExists) {
      errors.push('Document field must be unique');
      return;
    }
    // Validate the rest of the fields
    validateBirthdate(person.birthdate, errors);
    validateDocument(person.documentTypeId, person.document, errors);
    validateGender(person.gender, errors);
    validateLastName(person.lastName, errors);
    validateName(person.name, errors);
  }

  async function validatePersonModify(id, person, errors) {
    // Validate if document exists
    const documentExists = await personModel.findOne({ where: { document: person.document } });
    if (documentExists && documentExists.id !== id) {
      errors.push('Document field must be unique');
    }
    // Validate the rest of the fields
    if (person.birthdate) {
      validateBirthdate(person.birthdate, errors);
    }
    if (person.documentTypeId) {
      validateDocument(person.documentTypeId, person.document, errors);
    }
    if (person.lastName) {
      validateLastName(person.lastName, errors);
    }
    if (person.name) {
      validateName(person.name, errors);
    }
  }
  //#endregion

  async function doList(requestQuery) {
    // Get the query
    let qOrderBy = getOrderField(requestQuery.orderBy);
    let qOrderType = getOrderType(requestQuery.orderType);
    let qQueryWhereClause = getQueryWhereClause(requestQuery.query.split(' '));
    // Execute the query
    const people = await personModel.findAll({
      include: { all: true },
      limit: requestQuery.limit,
      offset: requestQuery.offset,
      order: [[...qOrderBy, qOrderType]],
      where: {
        [Op.or]: [
          { name: qQueryWhereClause },
          { lastName: qQueryWhereClause }
        ]
      }
    });
    // Return the data
    return baseService.getServiceResponse(200, 'Success', people.map(p => getSimplePersonModel(p)));
  }

  async function modify(id, person) {
    // If person doesn't exist, return 404
    const personExists = await personModel.findOne({ where: { id } });
    if (!personExists) {
      return baseService.getServiceResponse(404, 'Not found', {});
    }
    // Else, validate fields
    const errors = [];
    await validatePersonModify(id, person, errors);
    // If errors were found, return 400
    if (errors.length > 0) {
      return baseService.getServiceResponse(400, 'Error', errors.join('\n'));
    }
    // Else, create the person
    let modifiedPerson = await personModel.update(person, { where: { id } });
    // Then obtain their complete data (including associations)
    modifiedPerson = await personModel.findOne({
      include: { all: true },
      where: { id }
    });
    // And return 200
    return baseService.getServiceResponse(200, 'Success', getSimplePersonModel(modifiedPerson));
  }

  async function create(person) {
    // Validate fields
    const errors = [];
    await validatePersonCreate(person, errors);
    // If errors were found, return 400
    if (errors.length > 0) {
      return baseService.getServiceResponse(400, 'Error', errors.join('\n'));
    }
    // Else, create the person
    let createdPerson = await personModel.create(person);
    // Then obtain their complete data (including associations)
    createdPerson = await personModel.findOne({
      include: { all: true },
      where: { id: createdPerson.id }
    });
    // And return 200
    return baseService.getServiceResponse(200, 'Success', getSimplePersonModel(createdPerson));
  }

  async function findById(id) {
    // Find person
    const person = await personModel.findOne({
      include: { all: true },
      where: { id }
    });
    // If a person was found, return 200
    if (person) {
      return baseService.getServiceResponse(200, 'Success', getSimplePersonModel(person));
    }
    // Else, return 404
    else {
      return baseService.getServiceResponse(404, 'Not found', {});
    }
  }

  return {
    create,
    doList,
    findById,
    modify,
    validateName,
    validateLastName
  };
}
