'use strict';

const express = require('express');
const additionalChargeController = require('./additional.charge.controller');

const router = express.Router();

router.post('/', additionalChargeController.post);

module.exports = router;
