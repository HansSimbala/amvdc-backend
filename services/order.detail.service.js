'use strict';

const setupBaseService = require('./base.service');

module.exports = function setupOrderDetailService(orderDetailModel, productService) {

  async function create(orderDetail) {
    const getOrderDetail = await orderDetailModel.create(orderDetail);
    return getOrderDetail;
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
