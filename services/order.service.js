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
    if(!order.eventId) {
      console.log("Null event");
    }
    const newOrder = {
      shippingDate: order.shippingDate,
      customerId: parseInt(order.customerId),
      locationId: parseInt(order.locationId),
      orderStateId: constants.CONFIRMED_ORDER_STATE.id,
      orderTypeId: parseInt(order.orderTypeId)
    };
    const getOrder = await orderModel.create(newOrder);
    const orderDetails = order.orderDetail;
    orderDetails.map(o => o.orderId = getOrder.id);
    await Promise.all(orderDetails.map(oD => orderDetailService.create(oD)));
    return baseService.getServiceResponse(200, 'Success', getOrder);
  }

  async function doList(requestQuery) {
    try {
      let ordersList = [];
      let orderStateId = requestQuery.orderStateId;
      let latitude = requestQuery.latitude;
      let longitude = requestQuery.longitude;
      // TODO orderByLatAndLong 
      const orders = await orderModel.findAll({
        where: { orderStateId }
      });
      if (orders) {
        ordersList = await Promise.all(orders.map(o => getSimpleOrderModel(o)));
      }
      return baseService.getServiceResponse(200, "Success", ordersList);
    } catch (err) {
      console.log('Error: ', err);
      return baseService.getServiceResponse(500, err, {});
    }
  }

  async function findById(id) {
    const order = await orderModel.findByPk(id);
    if (order) {
      return baseService.getServiceResponse(200, 'Success', await getOrderModel(order));
    } else {
      return baseService.getServiceResponse(404, 'Not found', {});
    }    
  }

  async function getSimpleOrderModel(order) {
    const customer = await customerService.findById(order.customerId);
    const location = await locationService.findById(order.locationId);
    const fullName = customer.name + ' ' + customer.lastName;
    return {
      id: order.id,
      orderStateId: order.orderStateId,
      orderTypeId: order.orderTypeId,
      shippingDate: order.shippingDate,
      customer: fullName,
      contactNumber: customer.contactNumber,
      address: location.address,
      reference: location.reference,
      latitude: location.latitude,
      longitude: location.longitude
    };
  }

  async function getOrderModel(order) {
    const orderModel = await getSimpleOrderModel(order);
    const orderDetail = await orderDetailService.findByOrderId(order.id);
    return {
      ...orderModel,
      orderDetail
    };
  }

  return {
    create,
    doList,
    findById
  };
}
