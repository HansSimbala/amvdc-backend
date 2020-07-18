'use strict';

const inquirer = require('inquirer');
const chalk = require('chalk');
const dbInstance = require('./');
const seeders = require('./setup.seeders');

const prompt = inquirer.createPromptModule();

async function setup() {
  const answer = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'This will destroy your database, are you sure?'
    }
  ]);

  if (!answer.setup) {
    return console.log('Nothing to be worry');
  }

  const db = await dbInstance(true).catch(handleFatalError);
  await seeders.seedCategories(db.categoryModel);
  await seeders.seedDocumentTypes(db.documentTypeModel);
  
  await seeders.seedLocations(db.locationModel);
  await seeders.seedOrderStates(db.orderStateModel);
  await seeders.seedOrderTypes(db.orderTypeModel);

  await seeders.seedPeople(db.personModel);
  
  await seeders.seedPermissions(db.permissionModel);
  await seeders.seedRoles(db.roleModel);
  await seeders.seedRolePermissions(db.rolePermissionModel);
  await seeders.seedUsers(db.userModel);
  await seeders.seedUserRoles(db.userRoleModel);

  console.log('Success');
  process.exit(0);
}

function handleFatalError(err) {
  console.error(`${chalk.red('[Fatal error]')} ${err.message}`);
  console.error(err.stack);
  process.exit(1);
}

setup();
