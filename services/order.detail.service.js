'use strict';

const setupBaseService = require('./base.service');

module.exports = function setupOrderDetailService(orderDetailModel, productService) {
  let baseService = new setupBaseService();

  async function create(location) {
    await orderDetailModel.create(location);
    return baseService.getServiceResponse(200, 'Success', {});
  }

  async function findByOrderId(orderId) {
    const orderDetails = await orderDetailModel.findAll({ where: { orderId } });
    return await Promise.all(orderDetails.map(oD => getOrderDetailModel(oD)));
  }

  async function getOrderDetailModel(orderDetail) {
    const product = await productService.findById(orderDetail.productId);
    return {
      product: product.name,
      unitPrice: product.price,
      quantity: orderDetail.quantity
    };
  }

  return {
    create,
    findByOrderId
  };
}
