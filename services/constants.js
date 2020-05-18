'use strict';

module.exports = {
  // Categories
  beerCategory: { id: 1, name: 'Cerveza'},
  bottledWaterCategory: { id: 3, name: 'Agua'},
  softDrinkCategory: { id: 2, name: 'Gaseosa'},
  // Status
  activeStatus: { id: 1, name: 'Active' },
  inactiveStatus: { id: 0, name: 'Inactive' },
  // Document Types
  dniDocumentType: { id: 1, name: 'DNI' },
  foreignCardDocumentType: { id: 3, name: 'Foreign card' },
  passportDocumentType: { id: 2, name: 'Passport' },
  // BCRYPT
  BCRYPT_WORK_FACTOR: 12
}
