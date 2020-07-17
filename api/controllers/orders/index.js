'use strict';

const express = require('express');
const ordersController = require('./orders.controller');
const orderController = require('./order.controller');

const router = express.Router();

router.get('/', ordersController.get);
router.post('/', orderController.post);
router.get('/:id', orderController.get);

module.exports = router;
