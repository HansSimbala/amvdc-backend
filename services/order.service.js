'use strict';

const setupBaseService = require('./base.service');

const constants = require('./constants');

module.exports = function setupOrderService(dependencies) {
  let baseService = new setupBaseService();
  const orderModel = dependencies.orderModel;
  const orderDetailService = dependencies.orderDetailService;
  const customerService = dependencies.customerService;
  const locationService = dependencies.locationService;

  async function create(order) {
    order.orderStateId = constants.CONFIRMED_ORDER_STATE.id;
    if(!order.eventId) {
      order.eventId = null;
    }
    await orderModel.create(order);
    return baseService.getServiceResponse(200, 'Success', {});
  }

  async function doList() {
    try {
      const orders = await orderModel.findAll();
      console.log("HHR"+ JSON.stringify(await getOrderModel(orders[1])));
      return baseService.getServiceResponse(200, "Success", await Promise.all(orders.map(o => getOrderModel(o))));
    } catch (err) {
      console.log('Error: ', err);
      return baseService.getServiceResponse(500, err, {});
    }
  }

  async function getOrderModel(order) {
    const customer = await customerService.findById(order.customerId);
    const location = await locationService.findById(order.locationId);
    //const fullName = customer.name + ' ' + customer.lastName;
    return {
      shippingDate: order.shippingDate,
      customer: customer.personId,
      address: location.address
    };
  }

  return {
    create,
    doList
  };
}
