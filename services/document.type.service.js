'use strict';

const setupBaseService = require('./base.service');

module.exports = function setupDocumentTypeService(documentTypeModel) {
  let baseService = new setupBaseService();

  //#region Helpers
  function getSimpleDocumentTypeModel(model) {
    return {
      id: model.id,
      name: model.name
    };
  }
  //#endregion

  async function doList() {
    try {
      const documentTypes = await documentTypeModel.findAll();
      return baseService.getServiceResponse(200, "Success", documentTypes.map(dT => getSimpleDocumentTypeModel(dT)));
    } catch (err) {
      console.log('Error: ', err);
      return baseService.getServiceResponse(500, err, {});
    }
  }

  return {
    doList
  };
}
