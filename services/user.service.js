'use strict';

const Sequelize = require('sequelize');
const setupBaseService = require('./base.service');

const Op = Sequelize.Op;

module.exports = function setupUserService(userModel) {
  let baseService = new setupBaseService();
  function getOrderField(orderBy) {
    let qOrderBy;
    switch (orderBy) {
        case 1:
            qOrderBy = ['id'];
            break;
        case 2:
            qOrderBy = ['username'];
            break;
        case 3:
            qOrderBy = ['email'];
            break;
        default:
            qOrderBy = 'id';
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
      [Op.or]: queries.map((q) => {
        return { [Op.like]: `%${q}%` };
      }),
    };
  }

  function getSimpleUserModel(model) {
    return {
      id: model.id,
      username: model.username,
      email: model.email,
      password: model.password,
      personId: model.person.personId,
      status: model.status,
    };
  }

  async function doList(requestQuery) {
    let qOrderBy = getOrderField(requestQuery.orderBy);
    let qOrderType = getOrderType(request.orderType);
    let qQueryWhereClause = getQueryWhereClause(requestQuery.query.split(' '));
    const user = await userModel.findAll({
      include: { all: true },
      limit: requestQuery.limit,
      offset: requestQuery.offset,
      order: [[...qOrderBy, qOrderType]],
      where: {
        [Op.or]: [
          { id: qQueryWhereClause },
          { email: qQueryWhereClause },
          { username: qQueryWhereClause },
        ],
      },
    });
    return baseService.getServiceResponse(200, 'Success', user.map((p) => getSimpleUserModel(p)));
  }

  async function findById(id) {
    const user = await userModel.findOne({
      include: { all: true },
      where: { id }
    });
    if (user) {
      return baseService.getServiceResponse(200, 'Success', getSimpleUserModel(user));
    } else {
      return baseService.getServiceResponse(404, 'Not found', {});
    }
  }

  return {
    doList,
    findById
  };
}
