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
  CREDIT_SALE_PERMISSION: { id: 4, name: 'Venta al credito', slug: 'credit', description: 'Venta al crédito.' },
  // Role
  ADMINISTRATE_ROLE: { id: 1, name: 'Administrar', slug: 'administrate', description: 'Administración del sistema.' },
  COLLECT_ROLE: { id: 2, name: 'Cobrar', slug: 'collect', description: 'Cobro de pedidos.' },
  DISTRIBUTE_ROLE: { id: 3, name: 'Distribuir', slug: 'distribute', description: 'Distribución de pedidos.' },
  // Status
  ACTIVE_STATUS: { id: 1, name: 'Active' },
  INACTIVE_STATUS: { id: 0, name: 'Inactive' },
  // ORDER STATES
  CONFIRMED_ORDER_STATE: { id: 1, name: 'Confirmada', description: 'Orden confirmada.' },
  CANCELLED_ORDER_STATE: { id: 2, name: 'Cancelada', description: 'Orden cancelada.' },
  SHIPPED_ORDER_STATE: { id: 3, name: 'Preparada', description: 'Orden preparada para su envío.' },
  EN_ROUTE_ORDER_STATE: { id: 4, name: 'En ruta', description: 'Orden en ruta.' },
  ARRIVED_ORDER_STATE: { id: 5, name: 'Arribada', description: 'Orden arribada al destino.' },
  COMPLETED_ORDER_STATE: { id: 6, name: 'Completada', description: 'Orden completada' },
  // ORDER TYPE
  CASH_ORDER_TYPE: { id: 1, name: 'Pedido al contado', description: 'Pedido al contado.' },
  CONSIGNMENT_ORDER_TYPE: { id: 2, name: 'Pedido por consignación', description: 'Pedido por consignación.' },
  // User
  ADMIN_USER: { id: 1, username: 'admin', email: 'admin@amvdc.com', password: 'admin' },
  DELIVERY_USER: { id: 2, username: 'delivery', email: 'delivery@amvdc.com', password: 'delivery' },
  // Person
  ADMIN_PERSON: { id: 1, name: 'Hans', lastName: 'Simbala', birthdate: '1998-03-31', document: '72721607', createdAt: new Date(), updatedAt: new Date() },
  DELIVERY_PERSON: { id: 2, name: 'Juan', lastName: 'Perez', birthdate: '1985-07-25', document: '78791907', createdAt: new Date(), updatedAt: new Date() },
  // BCRYPT
  BCRYPT_WORK_FACTOR: 12
}
