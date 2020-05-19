'use strict';

const bcrypt = require('bcryptjs');

const constants = require('./constants');
const setupBaseService = require('./base.service');

module.exports = function setupContributedService(dependencies) {
    let baseService = new setupBaseService();
    const userModel = dependencies.userModel;
    const personService = dependencies.personService;
    const personModel = dependencies.personModel;

    async function createUser(user) {
      const errors = [];
      const fullName = user.fullName.split(/\s+/);
      let password = user.password;
      await validateUserCreate(fullName, user, errors);
      if (errors.length > 0) {
        return baseService.getServiceResponse(400, 'Error', errors.join('\n'));
      }
      let createdPerson = await personModel.create({ name: fullName[0], lastName: fullName[1] });
      password = await bcrypt.hash(password, constants.BCRYPT_WORK_FACTOR);
      await userModel.create({
        email: user.email,
        password: password,
        personId: createdPerson.id,
        status: constants.activeStatus.id
      });
      return baseService.getServiceResponse(200, 'Success', {});
    }
    async function validateUserCreate(fullName, user, errors) {
      const emailExists = await userModel.findOne({ where: { email: user.email } });
      const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      if(fullName.length != 2){
        errors.push('The full name field must be in the format: Name Lastname');
      }
      personService.validateName(fullName[0], errors);
      personService.validateLastName(fullName[1], errors);
      if (emailExists) {
        errors.push('Email already exist');
        return;
      }
      if (!emailRegex.test(user.email)) {
        errors.push('Invalid email format');
      }
    }
  return {
    createUser
  };
}
