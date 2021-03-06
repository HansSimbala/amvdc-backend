'use strict';

const express = require('express');
const router = express.Router();

router.use('/additionalCharges', require('./additional.charges'));
router.use('/authenticate', require('./authentication'));
router.use('/customers', require('./customers'));
router.use('/locations', require('./locations'));
router.use('/orders', require('./orders'));
router.use('/people', require('./people'));
router.use('/users', require('./users'));

module.exports = router;
