'use strict';

module.exports = {
  // Categories
  BEER_CATEGORY: { id: 1, name: 'Cerveza', description: 'Bebida alcoholica.' },
  BOTTLED_WATER_CATEGORY: { id: 2, name: 'Agua', description: 'Agua mineral y de mesa.' },
  SOFT_DRINK_CATEGORY: { id: 3, name: 'Gaseosa', description: 'Gaseosa y refresco.' },
  // Document Types
  DNI_DOCUMENT_TYPE: { id: 1, name: 'DNI' },
  FOREIGN_CARD_DOCUMENT_TYPE: { id: 3, name: 'Foreign card' },
  PASSPORT_DOCUMENT_TYPE: { id: 2, name: 'Passport' },
  // Permission
  ORDERS_PERMISSION: { id: 1, name: 'Pedidos', slug: 'orders', description: 'Lista de pedidos a entregar.' },
  CASH_SALE_PERMISSION: { id: 2, name: 'Venta al contado', slug: 'cash', description: 'Venta al contado.' },
  CONSIGNMENT_SALE_PERMISSION: { id: 3, name: 'Venta a consignación', slug: 'consignment', description: 'Venta sobre consignación.' },
  CREDIT_SALE_PERMISSION: { id: 4, name: 'Venta al credito', slug: 'credit', description: 'Venta al credito.' },
  // Role
  ADMINISTRATOR: { id: 1, name: 'Aministrador', slug: 'administrator', description: 'Se encarga de que se cumpla las entregas.' },
  DEBT_COLLECTOR: { id: 2, name: 'Reparto', slug: 'debt-collector', description: 'El que realiza el cobro de los pedidos.' },
  DELIVERY_DRIVER: { id: 3, name: 'Chofer Repartidor', slug: 'delivery-driver', description: 'El distribuidor del pedido.' },
  // Status
  ACTIVE_STATUS: { id: 1, name: 'Active' },
  INACTIVE_STATUS: { id: 0, name: 'Inactive' },
  // BCRYPT
  BCRYPT_WORK_FACTOR: 12
}
