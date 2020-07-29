'use strict';

const express = require('express');
const customerController = require('./customer.controller');

const router = express.Router();

router.post('/', customerController.post);

module.exports = router;